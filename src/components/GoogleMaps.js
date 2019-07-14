
import { H } from './here.js'



const hereApiKey = 'UGApdivMjzOH4Jtzsm71ODV_GpucWn7MQoyPXLeVkgU'

const platform = new H.service.Platform({
  'apikey': hereApiKey
})

const geocoder = platform.getGeocodingService()
export const geocode = (searchText) => {
  return new Promise((resolve, reject) => {
    const onResult = result => {
      const locations = result.Response.View[0].Result
      resolve({
        lat: locations[0].Location.DisplayPosition.Latitude,
        lng: locations[0].Location.DisplayPosition.Longitude
      })
    }
    geocoder.geocode({ searchText }, onResult, e => { console.err(e) })
  })
}

export const searchGoogleMaps = async (string) => {

  console.log(null)
}

/*
    //setting up a couple of globals before webpack these will be put
    //into our form
      const googlemap = document.querySelector("#googlemap")
      const googlebutton = document.querySelector("#submit")
      const googleinput = document.querySelector("#address")
      let googlemarker;
      function initMap() {
        var map = new google.maps.Map(googlemap, {
          zoom: 8,
          center: {lat: -34.397, lng: 150.644}
        });
        var geocoder = new google.maps.Geocoder();
        googlebutton.addEventListener('click', function() {
          geocodeAddress(geocoder, map);
        });
      }
      function geocodeAddress(geocoder, resultsMap) {
        var address = googleinput.value;
        console.log(googleinput)
        console.log("address is " + address)
        googlemarker = new Promise((resolve, reject) => {
          geocoder.geocode({'address': address}, function(results, status) {
            if (status === 'OK') {
              resultsMap.setCenter(results[0].geometry.location);
              marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location
              });
              resolve(marker)
            } else {
              alert('Geocode was not successful for the following reason: ' + status);
              reject(status)
            }
          });
        })
      }
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC2VNU44wvsDplC413rmXbxBYirkCbKU1A&callback=initMap"
      async defer></script>
      */