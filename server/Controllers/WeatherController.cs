﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace server.Controllers
{
    [Route("api/weather")]
    [EnableCors]
    [ApiController]
    public class WeatherController : ControllerBase
    {
        // GET api/values
        [HttpGet]
        [EnableCors("AllowAll")]
        public ActionResult<string> Get()
        {
            WeatherData weather = new WeatherData("cloudy", 5.5, 2.2);
            return JsonConvert.SerializeObject(weather);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
