import '../styles/Filter.css'

// This component displays a search bar and a category selector
const Filter = ( {setSearch, search, productCategory, setProductCategory, currentCategory} ) => {
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleCategory = (event) => {
    setProductCategory(event.target.value)
  }

  const categoryOptions = {
    'Kahvilaitteet': (
      <optgroup label="Kahvilaitteet">
        <option value="3">Espressolaitteet</option>
        <option value="4">Suodatinkahvi</option>
        <option value="5">Kahvimyllyt</option>
      </optgroup>
    ),
    'Kulutustuotteet': (
      <>
        <optgroup label="Kulutustuotteet">
          <option value="6">Suodattimet</option>
        </optgroup>
        <optgroup label="Kahvi">
          <option value="8">Espressot</option>
          <option value="9">Suodatinkahvit</option>
        </optgroup>
      </>
    )
  }

  return (
    <div className="filter">
      <div className="search-bar">
        <label>Etsi tuotteita niiden nimellä</label>
        <input 
          value={search} 
          onChange={handleSearch} 
          className="search-input" 
          placeholder="Etsi"
        />
      </div>
      <div className="category-window">
        <label>Suodata lajityypin mukaan</label>
        <select
          name="osasto_id"
          value={productCategory}
          onChange={handleCategory}
          required
        >
          <option value="">Valitse osasto</option>
          {currentCategory && categoryOptions[currentCategory]}
        </select>
      </div>
    </div>
  )
}

export default Filter