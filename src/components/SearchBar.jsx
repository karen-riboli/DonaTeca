import '/src/styles/SearchBar.css';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className='search-container'>
        <input
            type='text'
            className='search-input'
            placeholder='Buscar livros por título ou autor...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        </div>
    )
}

export default SearchBar;