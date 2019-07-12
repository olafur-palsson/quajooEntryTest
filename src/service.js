
const currency = 'http://apis.is/currency/m5'
const weatherString = 'http://localhost:5000/api/weather'


const request = (requestString) => {

  requestString = encodeURI(requestString)

  const req = new XMLHttpRequest()
  req.timeout = 10000
  req.open('GET', requestString, true)
  req.send()

  return new Promise((resolve, reject) => {
    req.ontimeout = () => reject(new Error('Request timed out'))
    req.onerror = () => reject(new Error('Request status: ' + req.status))
    req.ontimeout = () => reject(new Error('Server timeout after 2 seconds'))
    req.onload = () => {
      try {
        const json = JSON.parse(req.responseText)
        resolve(json)
      } catch (error) {
        console.log('Error parsing json')
        resolve(req.responseText)
      }
    }
  }).catch(error => console.log('Error sending request:  \n  ' + error.message))
}

export const getCurrency = () => {
  request(currency)
}

export const getWeather = () => {
  return request(weatherString)
}
