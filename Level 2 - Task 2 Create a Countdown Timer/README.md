# Countdown Timer

A single-file countdown timer (HTML + CSS + vanilla JS) — no build step, no dependencies.

## Features
- Two modes:
  - **Timer** — set hours / minutes / seconds, or pick a quick preset (1, 5, 10, 25 min, 1 hr)
  - **Countdown to Date** — count down to any future date and time
- Circular progress ring that fills as time elapses
- Start / Pause / Resume / Reset controls
- Audio chime + visual alert (ring turns red, tab title updates) when time runs out
- Fully responsive, no external dependencies

## Usage
Open `index.html` directly in a browser, or serve it locally:
```
python -m http.server 8000
```
Then visit `http://localhost:8000`.

## Notes
- Everything runs client-side — no data is sent anywhere.
- The audio chime uses the Web Audio API; if a browser blocks autoplay audio,
  the visual alert (red ring + tab title) still shows.
