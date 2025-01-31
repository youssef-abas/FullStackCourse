import { useState, useEffect } from 'react'
import axios from 'axios'

import Notification from './components/Notification'

const Country = ({country, switchShowStatus}) => {
  if( country.showFull || showFullOverride) {
    return (
      <>
        <h1>{country.name.common} <button onClick={() => switchShowStatus(country)}>unshow</button></h1> 
        <p>
          capital {country.capital === undefined? 'information unavailable': country.capital[0]} <br />
          area {country.area}
        </p>

        <div>
          <h2>Languages:</h2>
          
          <ul>
            {Object.keys(country.languages).map(key => <li key={country.languages[key]}>{country.languages[key]}</li>)}
          </ul>

          <img alt={country.flags.alt} src={country.flags.png}></img>
        </div>
      </>
    )
  }

  return (
    <>{country.name.common} <button onClick={() => switchShowStatus(country)}>show</button></>
  )
}

const DisplayCountries = ({countries, switchShowStatus}) => {
  if( countries.length === 1)
    return (
      <Country country={countries[0]} showFullOverride={true} switchShowStatus={switchShowStatus}/>
    )
  if(countries.length > 10)
    return (
      <p>
        Too many matches, specify another filter
      </p>
    )
  
  return (
    <ul>
      {countries.map(country => 
        <li key={country.name.common}>
          <Country country={country} switchShowStatus={switchShowStatus}/>
        </li>
      )}
    </ul>
  )
}

const App = () => {
  const [search, setSearch] = useState('search for country')
  const [searching, setSearching] = useState(false)
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        const receivedCountries = response.data
        
        setCountries(receivedCountries.map(country => {
          country['showFull'] = false
          return country
        }))
      })
  }, [])

  const handleSearchChange = event => {
    setSearch(event.target.value)
  }

  const handleSearchClick = event => {
    setSearch('')
    setSearching(true)
  }

  const switchShowStatus = (country) => {
    const selectedCountry = {...country, showFull: !country.showFull}
    const newCountries = countries.map(listedCountry => listedCountry.name.common === country.name.common? selectedCountry: listedCountry)

    setCountries(newCountries)
  }

  const countriesToShow = 
    searching ?
        countries.filter(country => {
        return country.name.common.toLowerCase().includes(search.toLowerCase()) || country.name.official.toLowerCase().includes(search.toLowerCase())
      }) : countries

  return (
    <>
      <div>
        find countries<input value={search} onChange={handleSearchChange} onClick={handleSearchClick}></input>
      </div>
      
      <div>
        <DisplayCountries countries={countriesToShow} switchShowStatus={switchShowStatus}/>
      </div>
    </>
  )
}

export default App