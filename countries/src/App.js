
import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'

const App = () => {
  const [countryInfo, setCountryInfo] = useState(null) // search results
  const [countries, setCountries] = useState(null) // all countries data
  const [searchCountry, setSearchCountry] = useState('') // search term

  useEffect(() => {
    console.log('effect run, get all countries')
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then(response => {
        const data = response.data
        console.log('response', data)
        setCountries(data)
      })
  }, [])

  const handleChange = (event) => {
    setSearchCountry(event.target.value)
    setCountryInfo(null) // reset search results when search term changes
  }

  useEffect(() => {
    if (countries) {
      console.log('searching saved countries for...', searchCountry)
      const matchingCountries = countries.filter(country => country.name.common.toLowerCase().includes(searchCountry.toLowerCase()))
      if (matchingCountries.length > 10) {
        setCountryInfo('Too many results, please be more specific')
      } else if (matchingCountries.length > 1) {
        const countryNames = matchingCountries.map(country => country.name.common)
        setCountryInfo(countryNames)
      } else if (matchingCountries.length === 1) {
        setCountryInfo(matchingCountries)
      } else {
        setCountryInfo('No results found')
      }
    }
  }, [searchCountry, countries])

  console.log("countryInfo", countryInfo)

  const handleShowClick = (showCountry) => {
    console.log('hey', showCountry)
    const filteredSearch = countries.filter(country => country.name.common?.toLowerCase().includes(showCountry.toLowerCase()))
    console.log(filteredSearch)
    setCountryInfo(filteredSearch)
  }




  return (
    <div>
      <form>
        search for any country: <input value={searchCountry} onChange={handleChange} />
      </form>
      {countryInfo && countryInfo.length > 0 ? (
        <CountryList countries={countryInfo} handleShowClick={handleShowClick} />
      ) : (
        <div>{countryInfo || 'Enter a country name to search'}</div>
      )}
    </div>
  )
}

export default App
