
import React from 'react'

import { FaCloud, FaSun, FaCloudSun, FaWind } from 'react-icons/fa'
import { getCurrency, getWeather }from '../service'

getCurrency()

export default class WeatherWidget extends React.Component{
  constructor (props) {
    super(props)
    this.state = { weatherData: {} }
    this.updateWeather()
  }

  async updateWeather () {
    this.setState({ weatherData: await getWeather() })
  }

  render () {
    let { 
      temp,
      weather,
      wind
    } = this.state.weatherData

    console.log(this.state.weatherData)

    return <div>
      <FaCloud />
      <FaSun />
      <FaCloudSun />
      <div>Temperature: { temp }</div>
      <div>Descr: { weather }</div>
      <div><FaWind/> Wind speed: { wind }</div>
    </div>
  }
}