
import React from 'react'

// import { FaCloud, FaSun, FaCloudSun, FaWind } from 'react-icons/fa'
import { geocode, getCurrency, getWeather }from '../service'
import './WeatherWidget.css'
import Cookies from '../Cookiehandler'

import bgCloudy from './cloudy.png'
import City from './City'

const fakeWeather = require('../weather.json')


export default class WeatherWidget extends React.Component{
  constructor (props) {
    super(props)
    this.state = { 
      isCelsius: true,
      lat: 0,
      lon: 0,
      display_name: 'Location',
      message: 'Enter your favorite location in the World',
      heading: null,
      cloudCover: null,
      image: this.writeBackgroundImageStyle('cloudy.png'),
      citiesWithWeather: []
    }
    this.timeout = null
    this.cities = this.getCities()
    this.getWeatherForCities()
  }

   getCities () {
    return Cookies.getCities()
  }
  
  getWeatherForCities () {
    const failedCities = []
    if (this.cities.length === 0) return
    Promise.all(
      this.cities.map(city => {
        if (city.lat == undefined) return
        getWeather(city.lat, city.lon)
        .then(weatherData => {
          if (weatherData == undefined)
            failedCities.push(city)
          else
            this.addRenderableCity({
              cityName: city.cityName,
              weatherData
            })
        })
        .catch(() => {
          failedCities.push(city)
        })
      })
    ).then(() => {
      this.cities = failedCities
      this.getWeatherForCities()
    })
  }

  getFakeWeather (lat, lon) {
    return new Promise((resolve, recject) => {
      setTimeout(() => {
        resolve(fakeWeather)
      }, 200)
    })
  }

  failGetWeather (lat, lon) {
     return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject({ error: 200 })
      }, 200)
    })
  }

  addRenderableCity (cityData) {
    const citiesWithWeather = this.state.citiesWithWeather
    citiesWithWeather.push(cityData)
    this.setState({
      citiesWithWeather
    })
  }

  writeBackgroundImageStyle (imageUrl) {
    return {backgroundImage: "url(" + bgCloudy + ")"} 
  }

	getLatLong(searchString) {
    geocode(searchString).then(location => {
      if (Array.isArray(location) && location.length > 0) {
        const { lat, lon, display_name } = location[0]
        console.log(lat, lon)
        this.setState({ display_name, lat, lon })
        this.updateWeather(lat, lon)
      } else {
        this.setState({ display_name: 'Place not found'})
      }
    })
	}

  updateWeather (lat, lon) {
    getWeather(lat, lon).then(weatherData => {
      this.setState({ weatherData })
    })
  }

  handleInput (event) { 
    const searchString = event.target.value
    if (this.timeout) clearTimeout(this.timeout)
    this.timeout = setTimeout(() => { this.getLatLong(searchString) }, 200)
  }

  updateStateFromWeatherData (weatherData) {
    this.setState({
      weatherData
    })
  }

  switchBetweenTemperatureScales () {
    this.setState({
      isCelsius: !this.state.isCelsius,
    })
  }

  formatName (display_name) {
    const cityLocation = display_name.split(',')
    const lowestLevel = cityLocation[0] // like a city name or state
    const highestLevel = cityLocation[cityLocation.length - 1] // like a country name
    const lowestAndHighestAreEqual = lowestLevel.toLowerCase() === highestLevel.toLowerCase()
    return lowestAndHighestAreEqual ? lowestLevel : lowestLevel + ', ' + highestLevel
  }
    renderCity (weatherData, cityName) {
    return (<City
      isCelsius={this.state.isCelsius}
      weatherData={weatherData}
      cityName={cityName}
    />)
  }

  addCityToList() {
    const cityName = this.formatName(this.state.display_name)
    const lat = this.state.lat ? this.state.lat : 0.0
    const lon = this.state.lon ? this.state.lon : 0.0
    this.cities.push({
      cityName,
      lat,
      lon
    })
    Cookies.addCityToList(cityName, lat, lon)
    this.getWeatherForCities()
  }

  render() {
    const weatherData = require('../weather.json')
    return <div style={this.state.image} className="fullScreen" >
      <h1>{this.state.message}</h1>
      <h2>{this.state.display_name}</h2>
      <input type="text" onChange={this.handleInput.bind(this)} />
      <button onClick={this.switchBetweenTemperatureScales.bind(this)}>{ this.state.isCelsius ? 'C°' : 'F°'}</button>
      <button onClick={this.addCityToList.bind(this)}>Add city to list</button>
      <h2>{this.state.heading}</h2>
      <div className="cityContainer">
        { this.state.citiesWithWeather.map(city => this.renderCity(city.weatherData, city.cityName))}
      </div>
    </div>
  }
}