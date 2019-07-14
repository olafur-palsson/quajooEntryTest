/*
    A simple tool to set and get cookies of the browser
*/

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
  const cities = getCookie('places')
  setCookie('places', cities)
}

ifNoDefCitiesSetCitiesCookie()

const addCityToList = (city, lat, lon) => {

  const cityArray = getCookie('places').split(separatorCity)
  const cookieString = [city, lat, lon].join(separatorData)
  cityArray.push(cookieString)
  setCookie('places', cityArray.join(separatorCity))
  showCities()
}

const resetCookie = () => {
    deleteCookie('places')
    setCookie('places', '')
}

const removeCityFromList = (name) => {
  const cityArray = getCookie('places')
  let cityToRemoveIndex
  cityArray.forEach((cityName, i) => {
    if (cityName === name) cityToRemoveIndex = i
  })
  cityArray.splice(cityToRemoveIndex, 1)
  setCookie('places', cityArray)
}

const showCities = () => {
  console.log(getCookie('places').split(separatorCity))
}

const Cookies = {
  removeCityFromList,
  addCityToList,
  showCities
}

export default Cookies