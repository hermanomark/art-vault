// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useEffect, useState } from 'react'
import './App.css'

const API_BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchArts = async (query) => {
    setLoading(true);
    setResults([]);

    try {
      const response = query ? await fetch(
        `${API_BASE_URL}/search?q=${query}`
      ) : await fetch(`${API_BASE_URL}/search?departmentId=11&q=*`);
      const data = await response.json();

      if (data.objectIDs?.length > 0) {
        const ids = data.objectIDs.slice(0, 10);
        const detailPromises = ids.map((id) =>
          fetch(`${API_BASE_URL}/objects/${id}`).then((res) =>
            res.json()
          )
        );

        const artworks = await Promise.all(detailPromises);
        setResults(artworks.filter((art) => art.primaryImageSmall));
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Error fetching artworks:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchArts("");
  }, []);

  return (
    <div className="max-w-4xl p-6 mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-black">Art Vault</h1>
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search artworks..."
          className="text-black flex-1 p-2 border rounded-lg"
        />
        <button
          onClick={() => fetchArts(query)}
          className="bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Search
        </button>
      </div>

      {loading && <p className="max-w-4xl mx-auto">Loading...</p>}

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
    </div>
  );
}

export default App
