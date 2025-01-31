import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY

const Country = ({country, showFullPage, showFullPageButton}) => {
  if( showFullPage ) {  
    return (
      <>
        <h1>{country.name.common}</h1> 
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
    <>{country.name.common} <button onClick={() => showFullPageButton(country)}>show</button></>
  )
}

const DisplayCountries = ({countries, showFullPageButton, setWeather, weather}) => {
  if( countries.length === 1 ){
    if(weather === null){
      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${countries[0].capitalInfo.latlng[0]}&lon=${countries[0].capitalInfo.latlng[1]}&appid=${api_key}&units=metric`)
      .then( (response) => {
        const receivedWeather = response.data
        console.log(receivedWeather)
        setWeather(receivedWeather)
      })

      return (
        <Country country={countries[0]} showFullPage={true} />
      )
    }

    return (
      <div>
        <Country country={countries[0]} showFullPage={true} />
        <div>
          <h1>Weather in {countries[0].capital[0]}</h1>
          <p>temperature {weather.main.temp} Celsius</p>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
          <p>wind {weather.wind.speed}</p>
        </div>
      </div>
    )
  }

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
          <Country country={country} showFullPageButton={showFullPageButton}/>
        </li>
      )}
    </ul>
  )
}

const App = () => {
  const [search, setSearch] = useState('search for country')
  const [searching, setSearching] = useState(false)
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        const receivedCountries = response.data
        
        setCountries(receivedCountries)
      })
  }, [])

  const handleSearchChange = event => {
    setWeather(null)
    setSearch(event.target.value)
  }

  const handleSearchClick = event => {
    setWeather(null)
    setSearch('')
    setSearching(true)
  }

  const showFullPage = country => {
    setSearch(country.name.common)
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
        <DisplayCountries countries={countriesToShow} showFullPageButton={showFullPage} weather={weather} setWeather={setWeather}/>
      </div>
    </>
  )
}

export default App