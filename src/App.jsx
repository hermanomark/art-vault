// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useEffect, useState } from 'react';
import './App.css';
import { useDebounce } from 'react-use';
import Search from './components/Search';
import Card from './components/Card';

const API_BASE_URL = 'https://api.artic.edu/api/v1/artworks';

const Mediums = [
  'Paper (fiber product)',
  'Photographic paper',
  'Ink',
  'Inorganic Material',
  'Graphite',
  'Coating (material)',
  'Watercolor',
  'Acrylic',
  'Glass',
  'Silk (fiber)',
  'Crayons',
  'Gold',
  'Silver'
];

// const Mediums = [

// ]

function App() {
  const [searchQueryDebounced, setSearchQueryDebounced] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeMedium, setActiveMedium] = useState('');

  useDebounce(() => setSearchQueryDebounced(searchQuery), 640, [searchQuery]);

  const fetchArts = async (query = '', isMedium = false) => {
    setLoading(true);
    setErrorMessage('');
    setResults([]);
    
    if(!isMedium) {
      setActiveMedium('');
    }

    try {
      let endpoint = query ? `${API_BASE_URL}/search?q=${encodeURIComponent(query)}&limit=10&fields=id,title,image_id` : `${API_BASE_URL}`;

      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error('Failed to fetch arts');
      }

      const data = await response.json();

      if (data.data.length < 1) {
        throw new Error('No arts we\'re found');
      }

      const filterDataByImage = (data.data).filter(art => art.image_id);

      setResults(filterDataByImage|| []);
    } catch (error) {
      console.error('Error fetching artworks:', error);
      setErrorMessage(error.message || 'Failed to fetch arts!');
    }

    setLoading(false);
  };

  const handleMedium = (medium) => {
    setActiveMedium(medium);
    fetchArts(medium, true);
  }

  useEffect(() => {
    fetchArts(searchQueryDebounced, false);
  }, [searchQueryDebounced]);

  return (
    <div className='max-w-4xl p-6 mx-auto'>
      <h1 className='text-2xl font-bold mb-4 text-black'>Art Vault</h1>
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className='flex flex-wrap gap-2 mb-4'>
        {Mediums.map((medium, index) => (
          <div key={index} className={`border p-2 cursor-pointer ${medium === activeMedium ? 'bg-black text-white' : ''}`}
            onClick={() => handleMedium(medium)}
          >
            <h3>{medium}</h3>
          </div>
        ))}
      </div>
      {loading ? <p className='max-w-4xl mx-auto'>Loading...</p> : errorMessage ? (
        <h2 className='font-bold text-red-500'>{errorMessage}</h2>
      ) : (
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto'>
          {results.map((art) => (
            <Card key={art.id} art={art} />
          ))}
        </div>
      )}

    </div>
  );
}

export default App
