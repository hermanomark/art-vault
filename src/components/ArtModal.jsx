import { useEffect, useState } from 'react';
import Spinner from './Spinner';

const Modal = ({ artworkId, onClose }) => {
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (artworkId) {
      fetchArtworkDetails(artworkId);
    }
  }, [artworkId]);

  const fetchArtworkDetails = async (id) => {
    setLoading(true);
    setErrorMessage('');
    
    try {
      const endpoint = `https://api.artic.edu/api/v1/artworks/${id}`;

      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error('Failed to fetch artwork details');
      }
      
      const data = await response.json();

      setArtwork(data.data || null);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!artworkId) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-ivory max-w-4xl max-h-[90vh] w-full overflow-hidden shadow-2xl relative">
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Spinner />
            </div>
          ) : errorMessage ? (
            <div className="p-8 text-center">
              <p className="text-red-500 font-semibold">{errorMessage}</p>
            </div>
          ) : artwork ? (
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 p-6">
              <div className="flex justify-center w-full">
                {artwork.image_id ? (
                  <img
                    src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/620,/0/default.jpg`}
                    alt={artwork.title}
                    className="max-w-full w-full h-auto shadow-lg"
                  />
                ) : (
                  <div className="bg-gray-100 p-8 flex items-center justify-center min-h-[300px]">
                    <p className="text-gray-500">No image available</p>
                  </div>
                )}
              </div>

              <div className="space-y-4 font-lora">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {artwork.title}
                  </h3>
                  <p className="text-lg text-gray-700">
                    {artwork.artist_title || 'Unknown Artist'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  {artwork.date_display && (
                    <div>
                      <strong className="text-gray-600">Date:</strong>
                      <p className="text-gray-800">{artwork.date_display}</p>
                    </div>
                  )}

                  {artwork.medium_display && (
                    <div>
                      <strong className="text-gray-600">Medium:</strong>
                      <p className="text-gray-800">{artwork.medium_display}</p>
                    </div>
                  )}

                  {artwork.dimensions && (
                    <div>
                      <strong className="text-gray-600">Dimensions:</strong>
                      <p className="text-gray-800">{artwork.dimensions}</p>
                    </div>
                  )}

                  {artwork.place_of_origin && (
                    <div>
                      <strong className="text-gray-600">Origin:</strong>
                      <p className="text-gray-800">{artwork.place_of_origin}</p>
                    </div>
                  )}

                  {artwork.department_title && (
                    <div>
                      <strong className="text-gray-600">Department:</strong>
                      <p className="text-gray-800">{artwork.department_title}</p>
                    </div>
                  )}

                  {artwork.classification_title && (
                    <div>
                      <strong className="text-gray-600">Classification:</strong>
                      <p className="text-gray-800">{artwork.classification_title}</p>
                    </div>
                  )}
                </div>

                {artwork.description && (
                  <div>
                    <strong className="text-gray-600">Description:</strong>
                    <div 
                      className="text-gray-800 mt-1 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: artwork.description }}
                    />
                  </div>
                )}

                {artwork.credit_line && (
                  <div className="pt-4">
                    <strong className="text-gray-600">Credit:</strong>
                    <p className="text-gray-800 text-sm mt-1">
                      {artwork.credit_line}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Modal;