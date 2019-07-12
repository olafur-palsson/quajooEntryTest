
public class WeatherData {

  public string weather;
  public double temp;
  public double wind;
  public WeatherData(string weather, double temp, double wind) {
    this.weather = weather;
    this.temp = temp;
    this.wind = wind;
  }

  public string getWeather() {
    return weather;
  }

  public double getTemp() {
    return temp;
  }

  public double getWind() {
    return wind;
  }
}