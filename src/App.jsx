// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useEffect, useState } from 'react';
import './App.css';
import { useDebounce } from 'react-use';

const API_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';

function App() {
  const [searchQueryDebounced, setSearchQueryDebounced] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorState, setErrorState] = useState(false);

  useDebounce(() => setSearchQueryDebounced(searchQuery), 750, [searchQuery]);

  const fetchArts = async (query) => {
    setLoading(true);
    setErrorState(false);

    try {
      const endpoint = query ? `${API_BASE_URL}/search?q=${query}` : `${API_BASE_URL}/search?departmentId=11&q=*`;

      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();

      if (data.objectIDs?.length > 0) {
        const ids = data.objectIDs.slice(0, 20);
        const detailPromises = ids.map((id) =>
          fetch(`${API_BASE_URL}/objects/${id}`).then((res) => {
            return res.json();
          })
        );

        // const artworks = await Promise.all(detailPromises);
        const results = await Promise.allSettled(detailPromises);
        const artworks = results
        .filter(result => result.status === "fulfilled")
        .map(result => result.value)
        .filter(art => art.primaryImageSmall);

        console.log(artworks);

        setResults(artworks || []);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Error fetching artworks:", error);
      setErrorState(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchArts(searchQueryDebounced);
  }, [searchQueryDebounced]);

  return (
    <div className="max-w-4xl p-6 mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-black">Art Vault</h1>
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search artworks..."
          className="text-black flex-1 p-2 border rounded-lg"
        />
      </div>

      {loading ? <p className="max-w-4xl mx-auto">Loading...</p> : errorState ? (
        <h1>Did not fetch any arts!</h1>
      ): (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {results.map((art) => (
          <div key={art.objectID}>
            <img
              src={art.primaryImageSmall}
              alt={art.title}
              className="w-full h-48 object-cover rounded"
            />
            <p className="mt-2 text-gray-600 text-sm font-medium">{art.title}</p>
            <p className="text-xs text-gray-600">{art.artistDisplayName}</p>
          </div>
        ))}
      </div>
      ) }
      
    </div>
  );
}

export default App
