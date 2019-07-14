
const currency = 'http://apis.is/currency/m5'


const request = (requestString) => {

  requestString = encodeURI(requestString)

  const req = new XMLHttpRequest()
  req.timeout = 10000
  req.open('GET', requestString, true)
  req.send()

  return new Promise((resolve, reject) => {
    req.ontimeout = () => reject(new Error('Request timed out'))
    req.onerror = () => reject(new Error('Request status: ' + req.status))
    req.ontimeout = () => reject(new Error('Server timeout after 10 seconds'))
    req.onload = () => {
      try {
        if (req.status >= 400)
          reject('Error: ' + req.status)
        const json = JSON.parse(req.responseText)
        resolve(json)
      } catch (error) {
        console.log('Error parsing json')
        reject(req.responseText)
      }
    }
  }).catch(error => console.log('Error sending request:  \n  ' + error.message))
}

export const geocode = async (searchString) => {
  const requestString = `https://eu1.locationiq.com/v1/search.php?key=1ccea6f54c1281&q=${ searchString }&format=json`
  return await request(requestString)
}

export const getWeather = (lat, lon) => {
  let latString = lat + ''
  latString = lat.substring(0, 5)
  let lonString = lon + ''
  lonString = lon.substring(0, 5)
  const weatherString = `http://localhost:5000/api/weather/latlon/${latString}/${lonString}`
  return request(weatherString)
}
