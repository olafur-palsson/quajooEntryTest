using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net.Http;

namespace server.Controllers
{
    [Route("api/weather/")]
    [EnableCors]
    [ApiController]
    public class WeatherController : ControllerBase
    {
        const string apikey = "7652a3b63b68e32a39da5533cdd3d3d9";
        // GET api/values
        [HttpGet]
        [EnableCors("AllowAll")]
        public ActionResult<string> Get()
        {
            WeatherData weather = new WeatherData("cloudy", 5.5, 2.2);
            return JsonConvert.SerializeObject(weather);
        }

        [HttpGet]
        [Route("latlon/{lat}/{lon}")]
        [EnableCors("AllowAll")]
        public ActionResult<string> Get(double lat, double lon) {
            Console.WriteLine("Yolo");
            Task<string> response = getWeatherDataByGeoPointAsync(lat, lon);
            Console.WriteLine("What is this?");
            return response.Result;
        }

        private async Task<string> getWeatherDataByGeoPointAsync(double lat, double lon) {
            Console.WriteLine("yolo2");
            string requestString = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat.ToString() + "&lon=" + lon.ToString() + "&cnt=1&" + 
            "APPID=" + apikey;
            Console.WriteLine(requestString);
            HttpClient client = new HttpClient();
            return await client.GetStringAsync(requestString);
        }
    }
}
