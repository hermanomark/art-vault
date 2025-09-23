const Search = ({searchQuery, setSearchQuery}) => {
    return (<div className="flex gap-2 mb-6">
        <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search artworks..."
            className="text-black flex-1 p-2 border rounded-lg"
        />
    </div>);
}

export default Search;