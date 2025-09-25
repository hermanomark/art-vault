const Search = ({searchQuery, setSearchQuery}) => {
    return (
        <form className="mb-6" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Find artworks..."
                    className="w-full pl-10 pr-4 py-3 text-gray-900 placeholder-gray-500 border-0 border-b-1 focus:border-b-2 border-gray-400 focus:border-gray-800 focus:outline-none bg-transparent transition-colors duration-200 font-lora"
                />
            </div>
        </form>
    );
}

export default Search;