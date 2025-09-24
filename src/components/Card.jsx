const Card = ({art: {title, image_id}}) => {
    return (
        <div style={{ border: "1px solid #ddd", padding: "0.5rem" }}>
            <h3 style={{ fontSize: "1rem" }}>{title}</h3>
            {image_id ? (
                <img
                    // src={`https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`}
                    src={`https://www.artic.edu/iiif/2/${image_id}/full/200,/0/default.jpg`}
                    alt={title}
                    style={{ width: "100%", height: "auto" }}
                />
            ) : (
                <p>No image available</p>
            )}
        </div>
    );
}

export default Card;