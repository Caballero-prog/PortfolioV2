import Fastify from "fastify";
import fastifyCors from "@fastify/cors";

const fastify = Fastify({ logger: true });
await fastify.register(fastifyCors, { origin: "*" });

// Special overrides for known cities
const SPECIAL_OVERRIDES = {
  helsinki: { name: "Helsinki", latitude: 60.1699, longitude: 24.9384 },
  tampere: { name: "Tampere", latitude: 61.4981, longitude: 23.76 },
  turku: { name: "Turku", latitude: 60.4518, longitude: 22.2666 },
  oulu: { name: "Oulu", latitude: 65.0121, longitude: 25.4651 },
};

fastify.get("/weather", async (request, reply) => {
  try {
    const { city } = request.query;
    if (!city || !city.trim())
      return reply
        .status(400)
        .send({ error: "City query parameter is required" });

    const input = city.trim().toLowerCase();

    // 1️⃣ Check special overrides
    if (SPECIAL_OVERRIDES[input]) {
      const { name, latitude, longitude } = SPECIAL_OVERRIDES[input];
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=celsius&timezone=Europe/Helsinki`
      );
      const weatherData = await weatherRes.json();
      if (!weatherData.current_weather)
        return reply.status(500).send({ error: "Weather data unavailable" });

      return {
        city: name,
        temperature: weatherData.current_weather.temperature,
        windspeed: weatherData.current_weather.windspeed,
        weathercode: weatherData.current_weather.weathercode,
        time: weatherData.current_weather.time,
      };
    }

    // 2️⃣ Reject obvious gibberish inputs
    if (input.length < 2 || !/^[a-z\s\-]+$/.test(input)) {
      return reply.status(404).send({ error: "City not found" });
    }

    // 3️⃣ Normal geocoding
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        city
      )}`
    );
    const geoData = await geoRes.json();
    if (!geoData.results || geoData.results.length === 0)
      return reply.status(404).send({ error: "City not found" });

    // Filter out unwanted names
    const candidates = geoData.results.filter(
      (c) =>
        c.name &&
        !c.name.toLowerCase().includes("saari") &&
        !c.name.toLowerCase().includes("island") &&
        !c.name.toLowerCase().includes("airport")
    );

    if (!candidates.length) return reply.status(404).send({ error: "City not found" });

    // Prefer exact match on name or local names
    let cityInfo =
      candidates.find((c) => c.name.toLowerCase() === input) ||
      candidates.find((c) =>
        c.local_names &&
        Object.values(c.local_names).some((n) => n.toLowerCase() === input)
      ) ||
      candidates[0]; // fallback to first valid candidate

    const { latitude, longitude, name } = cityInfo;
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=celsius&timezone=Europe/Helsinki`
    );
    const weatherData = await weatherRes.json();
    if (!weatherData.current_weather)
      return reply.status(500).send({ error: "Weather data unavailable" });

    return {
      city: name,
      temperature: weatherData.current_weather.temperature,
      windspeed: weatherData.current_weather.windspeed,
      weathercode: weatherData.current_weather.weathercode,
      time: weatherData.current_weather.time,
    };
  } catch (error) {
    fastify.log.error(error);
    return reply.status(500).send({ error: "Failed to fetch weather" });
  }
});

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;
  console.log(`Server listening at ${address}`);
});
