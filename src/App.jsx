import { useEffect, useState } from 'react';
import { useDebounce } from 'react-use';
import Header from './components/Header';
import Search from './components/Search';
import Card from './components/Card';
import Spinner from './components/Spinner';
import Medium from './components/Medium';

const API_BASE_URL = 'https://api.artic.edu/api/v1/artworks';

function App() {
  const [searchQueryDebounced, setSearchQueryDebounced] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [mediums, setMediums] = useState([]);
  const [mediumsLoading, setMediumsLoading] = useState(false);
  const [activeMedium, setActiveMedium] = useState('');

  useDebounce(() => setSearchQueryDebounced(searchQuery), 640, [searchQuery]);

  const fetchMaterialTitles = async () => {
    try {
      setMediumsLoading(true);
      const page = Math.floor(Math.random() * 100) + 1;
      const endpoint = `${API_BASE_URL}/?limit=13&fields=material_titles&page=${page}`;
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error('Failed to fetch materials');
      }

      const data = await response.json();

      if (data.data.length < 1) {
        throw new Error('No materials were found');
      }

      const uniqueMaterials = [...new Set(data.data.map(item => item.material_titles).flat())].slice(0, 13);

      setMediums(uniqueMaterials || []);
    } catch (error) {
      console.error('Error fetching material titles:', error);
      return [];
    } finally {
      setMediumsLoading(false);
    }
  };

  const fetchArts = async (query = '', isMedium = false) => {
    setLoading(true);
    setErrorMessage('');
    setArtworks([]);

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

      setArtworks(filterDataByImage || []);
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

  useEffect(() => {
    fetchMaterialTitles();
  }, []);

  return (
    <main className='bg-ivory text-gray-800 min-h-screen pb-10'>

      <div className='pattern' />

      <div className='wrapper max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <Header />

        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {!mediumsLoading && <p className='text-sm font-lora mb-2 font-bold'>Mediums <span className='text-underline cursor-pointer' onClick={() => fetchMaterialTitles()}>(randomize)</span>:</p>}
        <div className='flex flex-wrap justify-center sm:justify-start gap-2 mb-8 sm:mb-6 md:mb-4'>
          {!mediumsLoading && mediums.map((medium, index) => (
            <Medium key={index} medium={medium} activeMedium={activeMedium} handleMedium={handleMedium} />
          ))}
        </div>

        {loading ? (
          <div className='flex justify-center'>
            <Spinner />
          </div>
        ) : errorMessage ? (
          <h2 className='font-bold font-lora text-red-500 text-center text-sm sm:text-base md:text-lg'>{errorMessage}</h2>
        ) : (
          <div className='columns-1 xs:columns-2 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-4 2xl:columns-4 gap-2 sm:gap-3 md:gap-4'>
            {artworks.map((art) => (
              <Card key={art.id} art={art} />
            ))}
          </div>
        )}

      </div>
    </main>
  );
}

export default App
