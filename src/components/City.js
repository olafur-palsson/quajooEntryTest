
import React from 'react'
import './City.css'

const KELVIN_DIFF = 273.15 
const celsiusToFahrenheit = degrees => degrees * 9 / 5 + 32

export default class City extends React.Component {

  renderWeatherItem(text, value) {
    return (
      <div className="weatherItem">
        {text}
        <p>{value}</p>
      </div>
    )
  }  

  setVariables (weatherData) {
    this.kelvin = weatherData.main.temp
    this.weatherDescription = weatherData.weather[0].description
    this.wind = Math.round(weatherData.wind.speed)
    this.windDirection = weatherData.wind.deg
    this.name = weatherData.weather[0].main
  }

  getTemperature () {
    const celsius = Math.round(this.kelvin - KELVIN_DIFF)
    const fahrenheit = celsiusToFahrenheit(celsius)
    return this.props.isCelsius ? celsius + '° C': fahrenheit + '° F'
  }

  render() {
    this.setVariables(this.props.weatherData)

    return (<div style={this.image} className="weather" >
      <h2>{this.props.cityName}</h2>
      {this.renderWeatherItem('Temperature:', this.getTemperature(this.temperature))}
      {this.renderWeatherItem('Description:', this.weatherDescription)}
      {this.renderWeatherItem('Wind speed:', this.wind)}
      {this.renderWeatherItem('Wind direction:', this.windDirection)}
    </div>)
  }
}