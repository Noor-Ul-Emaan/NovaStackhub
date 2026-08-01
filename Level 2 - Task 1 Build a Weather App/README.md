# Weather App

A single-file weather app (HTML + CSS + vanilla JS) that fetches and displays
live current weather conditions — no build step, no dependencies, no API key.

## Features
- Search weather by city name
- "Use my current location" button (browser geolocation)
- Live temperature, condition, feels-like, humidity, and wind speed
- °C / °F unit toggle
- Custom weather icons mapped from real weather codes
- Responsive layout

## How it works
- **Geocoding**: city name → latitude/longitude, via the free
  [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api)
  (`geocoding-api.open-meteo.com`)
- **Weather data**: latitude/longitude → current conditions, via the free
  [Open-Meteo Forecast API](https://open-meteo.com/en/docs)
  (`api.open-meteo.com`)

Both APIs are free, require **no API key or signup**, and support CORS, so the
app works directly from a static HTML file.

## Usage
Open `index.html` directly in a browser, or serve it locally:
```
python -m http.server 8000
```
Then visit `http://localhost:8000`.

## Notes
- Geolocation requires the user to grant browser permission.
- If a searched city isn't found, the app shows a clear error message
  instead of failing silently.
