export default function Search({ search, setSearch, onSearch }) {
    return (
        <div className="search-engine">
            <input
                type="text"
                className="city-search"
                placeholder="Enter city name"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />
            {/* Add a button and trigger onSearch on click */}
            <button onClick={onSearch}>Search</button> 
        </div>
    );
}