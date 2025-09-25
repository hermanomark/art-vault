import { useEffect, useState } from 'react';
import { useDebounce } from 'react-use';
import Search from './components/Search';
import Card from './components/Card';
import Spinner from './components/Spinner';

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

    if (!isMedium) {
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

      setResults(filterDataByImage || []);
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
    <main className='bg-ivory text-gray-800 min-h-screen pb-10'>
      <div className='pattern' />
      <div className='wrapper max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <header className='text-center mb-8 sm:mb-10 md:mb-12'>
          <h1 className='font-playfair-display text-6xl sm:text-8xl md:text-9xl lg:text-[140px] xl:text-[190px] leading-tight'>Art Vault</h1>
          <h2 className='font-bold font-lora text-lg sm:text-xl md:text-2xl mt-2'> Where <span className='text-gold'>Creativity</span> is Preserved and Shared</h2>
        </header>
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className='flex flex-wrap justify-center sm:justify-start gap-2 mb-8 sm:mb-6 md:mb-4'>
          {Mediums.map((medium, index) => (
            <div key={index} className={`border p-2 sm:p-3 cursor-pointer text-xs sm:text-sm md:text-base rounded-md hover:bg-gray-800 hover:text-white transition-colors ${medium === activeMedium ? 'bg-gray-800 text-white hover:bg-gray-800' : ''}`}
              onClick={() => handleMedium(medium)}
            >
              <h3 className='font-lora'>{medium}</h3>
            </div>
          ))}
        </div>
        {loading ? (
          <div className='flex justify-center'>
            <Spinner />
          </div>
        ) : errorMessage ? (
          <h2 className='font-bold text-red-500 text-center text-sm sm:text-base md:text-lg'>{errorMessage}</h2>
        ) : (
          <div className='columns-1 xs:columns-2 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-4 2xl:columns-4 gap-2 sm:gap-3 md:gap-4'>
            {results.map((art) => (
              <Card key={art.id} art={art} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default App
