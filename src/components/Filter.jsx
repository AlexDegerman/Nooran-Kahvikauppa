import '../styles/Filter.css'

// This component displays a search bar and a category selector
const Filter = ( {setSearch, search, productCategory, setCategory}) => {
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleCategory = (event) => {
    setCategory(event.target.value)
  }

  return (
    <div className="filter">
      {/* Search Bar */}
      <div className="search-bar">
        <label>Etsi tuotteita niiden nimellä</label>
        <input value={search} onChange={handleSearch} className="search-input" placeholder="Etsi"/>
      </div>
      {/* Category Selector */}
      <div className="category-window">
        <label>Suodata lajityypin mukaan</label>
            <select
              name="osasto_id"
              value={productCategory}
              onChange={handleCategory}
              required
            >
              <option value="">Valitse osasto</option>
              <optgroup label="Kahvilaitteet">
                <option value="3">Espressolaitteet</option>
                <option value="4">Suodatinkahvi</option>
              </optgroup>
              <optgroup label="Kulutustuotteet">
                <option value="6">Suodattimet</option>
              </optgroup>
              <optgroup label="Kahvi">
                <option value="8">Espressot</option>
                <option value="9">Suodatinkahvit</option>
              </optgroup>
            </select>
      </div>
    </div>
  )
}

export default Filter