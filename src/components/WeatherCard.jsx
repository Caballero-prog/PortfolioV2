import { useState, useEffect, useRef } from "react";

function WeatherCard() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const weatherImgRef = useRef(null);

  const fetchWeather = async () => {
  if (!city.trim()) return;

  try {
    const res = await fetch(`http://localhost:3000/weather?city=${encodeURIComponent(city)}`);
    const data = await res.json();

    if (!data || data.error || !data.city || !data.weathercode || !data.temperature) {
      console.warn("Invalid weather data:", data);
      setWeather(null);
      return;
    }
    setWeather(data);
  } catch (err) {
    console.error("Failed to fetch weather:", err);
    setWeather(null);
  }
};

  const weatherDescription = (code) => {
    const map = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Fog",
      48: "Depositing rime fog",
      51: "Drizzle",
      53: "Moderate drizzle",
      55: "Dense drizzle",
      61: "Rain",
      63: "Moderate rain",
      65: "Heavy rain",
      71: "Snow",
      73: "Moderate snow",
      75: "Heavy snow",
      80: "Rain showers",
      81: "Moderate rain showers",
      82: "Violent rain showers",
      95: "Thunderstorm",
      99: "Hail",
    };
    return map[code] || "Unknown";
  };

  // Fallbacks
  const cityName = weather?.city || "—";
  const temperature =
    weather?.temperature != null ? `${weather.temperature}°C` : "—°C";
  const weatherIcon = weather
    ? `/PortfolioV2/images/weather-icons/${weather.weathercode}.png`
    : `/PortfolioV2/images/weather-icons/reporter.png`;
  const humidity = weather?.humidity ?? "—";
  const wind = weather?.windspeed ?? "—";

  // Animate icon when weather code changes
  useEffect(() => {
    if (!weatherImgRef.current) return;
    const img = weatherImgRef.current;
    img.classList.remove("show");
    void img.offsetWidth; // force reflow
    img.classList.add("show");
  }, [weather?.weathercode]);

  return (
    <article className="weather-card">
      {/* Search Bar */}
      <section className="search">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search city..."
          className="search-bar"
        />
        <div className="search-icon" onClick={fetchWeather}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </section>

      {/* Weather Display */}
      <section className="weather-image">
        <img
          ref={weatherImgRef}
          src={weatherIcon}
          alt={
            weather
              ? weatherDescription(weather.weathercode)
              : "Default reporter"
          }
          className="hidden"
          onError={(e) => {
            e.target.src = "/PortfolioV2/images/weather-icons/reporter.png"; // fallback
          }}
        />
      </section>

      <section className="celcius">{temperature}</section>
      <section className="city-name">{cityName}</section>

      <section className="speed-humidity">
        <div className="humidity">
          <img src="/PortfolioV2/images/weather-icons/humidity.png" alt="Humidity" />
          {humidity}%
        </div>
        <div className="speed">
          <img src="/PortfolioV2/images/weather-icons/wind.png" alt="Wind speed" />
          {wind} km/h
        </div>
      </section>
    </article>
  );
}

export default WeatherCard;
