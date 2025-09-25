const Card = ({art: {title, image_id}}) => {
    return (
        <div className="inline-block w-full mb-2 rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 bg-white break-inside-avoid">
            {image_id ? (
                <div className="relative w-full overflow-hidden group">
                    <img
                        src={`https://www.artic.edu/iiif/2/${image_id}/full/300,/0/default.jpg`}
                        alt={title}
                        className="w-full h-auto block transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="m-0 text-white text-sm font-semibold leading-tight drop-shadow-lg">{title}</h3>
                    </div>
                </div>
            ) : (
                <div className="p-4 min-h-[120px] flex flex-col justify-center items-center bg-gray-100 text-center">
                    <p className="text-gray-600">No image available</p>
                    <h3 className="text-gray-800 text-sm font-semibold mt-2">{title}</h3>
                </div>
            )}
        </div>
    );
}

export default Card;