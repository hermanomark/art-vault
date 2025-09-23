// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useEffect, useState } from 'react';
import './App.css';
import { useDebounce } from 'react-use';

const API_BASE_URL = "https://api.artic.edu/api/v1/artworks";

function App() {
  const [searchQueryDebounced, setSearchQueryDebounced] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useDebounce(() => setSearchQueryDebounced(searchQuery), 640, [searchQuery]);

  const fetchArts = async (query) => {
    setLoading(true);
    setErrorMessage('');
    setResults([]);

    try {
      const endpoint = query ? `${API_BASE_URL}/search?q=${encodeURIComponent(query)}&limit=10&fields=id,title,image_id` : API_BASE_URL;

      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error('Failed to fetch arts');
      }

      const data = await response.json();

      if(data.data.length < 1) {
        throw new Error('No arts we\'re found');
      }

      setResults(data.data || []);
    } catch (error) {
      console.error("Error fetching artworks:", error);
      setErrorMessage(error.message || "Failed to fetch arts!");
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

      {loading ? <p className="max-w-4xl mx-auto">Loading...</p> : errorMessage ? (
        <h1 className='text-red-300'>{errorMessage}</h1>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {results.map((art) => (
            <div key={art.id} style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
              <h3 style={{ fontSize: "1rem" }}>{art.title}</h3>
              {art.image_id ? (
                <img
                  src={`https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`}
                  alt={art.title}
                  style={{ width: "100%", height: "auto" }}
                />
              ) : (
                <p>No image available</p>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default App
