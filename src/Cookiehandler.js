/*
    A simple tool to set and get cookies of the browser
*/


const cookieKey = 'notplaces'
const separatorCity = '#city'
const separatorData = '#data'

const setCookie = (name, value, days) => {
  let expires = ''
  if (days) {
    let date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    expires = '; expires=' + date.toUTCString()
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/'
}

const allCookies = () => {
  let cookieArray = document.cookie.split(';')
  let cookieObject = {}
  cookieArray.forEach(cookie => {
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1, cookie.length)
    }
    const cookiePair = cookie.split('=')
    cookieObject[cookiePair[0]] = cookiePair[1]
  })
  return cookieObject
}

const deleteCookie = name => {
  document.cookie = name + '=; Max-Age=-99999999;'
}

const getCookie = cookieName => {
  return allCookies()[cookieName]
}

const ifNoDefCitiesSetCitiesCookie = () => {
  const cities = getCookie('notplaces')
  setCookie('notplaces', cities)
}

ifNoDefCitiesSetCitiesCookie()

const addCityToList = (city, lat, lon) => {

  const cityArray = getCookie('notplaces').split(separatorCity)
  const cookieString = [city, lat, lon].join(separatorData)
  cityArray.push(cookieString)
  setCookie('notplaces', cityArray.join(separatorCity))
  showCities()
}

const resetCookie = () => {
    deleteCookie('notplaces')
    setCookie('notplaces', '')
}

const removeCityFromList = (name) => {
  const cityArray = getCookie('notplaces')
  let cityToRemoveIndex
  cityArray.forEach((cityName, i) => {
    if (cityName === name) cityToRemoveIndex = i
  })
  cityArray.splice(cityToRemoveIndex, 1)
  setCookie('notplaces', cityArray)
}

const showCities = () => {
  console.log(getCookie('notplaces').split(separatorCity))
}

const getCities = () => {
  const data = getCookie('notplaces')
  return data.split(separatorCity).map(city => {
    let [cityName, lat, lon] = city.split(separatorData)
    return {
      cityName,
      lat,
      lon
    }
  })
}

const Cookies = {
  removeCityFromList,
  addCityToList,
  showCities,
  getCities
}

export default Cookies