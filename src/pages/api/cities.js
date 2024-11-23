export default async function handler(req, res) {
  if (req.method === "GET") {
    const { query, cityId } = req.query;

    if (!query && !cityId) {
      return res
        .status(400)
        .json({ error: "The 'query' or 'cityId' parameter is required!" });
    }

    try {
      if (query) {
        // Fetch city data from geocoding API
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          query
        )}`;
        const geoResponse = await fetch(geoUrl);

        if (!geoResponse.ok) {
          return res
            .status(geoResponse.status)
            .json({ error: "Failed to fetch geocoding data!" });
        }

        const geoData = await geoResponse.json();
        const cities = geoData.results || [];

        const enrichedCities = await Promise.all(
          cities.map(async (city) => {
            const countryFlag = city.country_code
              ? `https://hatscripts.github.io/circle-flags/flags/${city.country_code.toLowerCase()}.svg`
              : null;

            const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true`;
            const weatherResponse = await fetch(weatherUrl);

            let weather = null;
            if (weatherResponse.ok) {
              const weatherData = await weatherResponse.json();
              weather = weatherData.current_weather || null;
            }

            return {
              id: city.id,
              name: city.name,
              country: city.country,
              latitude: city.latitude,
              longitude: city.longitude,
              country_flag: countryFlag,
              weather,
            };
          })
        );

        return res.status(200).json(enrichedCities);
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal server error!" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
