# NASA API Experiment

A Vue dashboard for NASA’s Astronomy Picture of the Day (APOD), InSight weather reports, and NASA library images. The original green-on-black visual style and `#/` and `#/insight` remain; `#/images` is the image route, with `#/marsphotos` redirected for existing links.

## [demo](https://nasaapiexp.netlify.app/#/)

## Development

Use Node.js 24. Install dependencies and run the Vite server:

```sh
nvm use
npm ci
npm run dev
```

`npm run serve` is an alias for the development server. `npm run check` runs lint, tests, TypeScript checking, and the production build. `npm run preview` serves the built app locally.

No NASA API key is needed. InSight weather comes from a bundled NASA archive response, while APOD and image search use public NASA services.

## Structure

```text
src/
  views/                The three route pages
  components/           Navigation, image cards, weather charts, and dialog
  services/nasaApi.ts   Typed NASA requests
  data/                 Archived InSight weather reports
  types/nasa.ts         NASA response shapes
  utils/                Weather data formatting and safe media URLs
  router.ts             Hash routes and the old image URL redirect
  styles/app.css        Original green-on-black theme
```

The build uses Vue 2.7, Vuetify 2, Vue Router 3, Chart.js 4, TypeScript, and Vite 7. Pages load by route. CI and Netlify run `npm run check` before deployment. Vue 2 and Vuetify 2 remain to preserve the application’s look; moving to a newer UI stack is a separate project.

## API behavior

APOD uses NASA’s [current APOD endpoint](https://api.nasa.gov/). That response may contain an article link in `url` and a preview image in `hdurl`. The page uses the image for previews and links video entries to the NASA article. Explanations and credits are shown as plain text.

InSight weather uses a snapshot of the [NASA weather API](https://api.nasa.gov/assets/insight/InSight%20Weather%20API%20Documentation.pdf) retrieved on October 28, 2026. The API returned the same seven reports from October 20–26, 2020; the page labels them as archived data and does not make a rate-limited browser request. Reports follow `sol_keys`; missing readings stay empty on their own sol, while available zero values remain zero. Cards show temperature in °C, pressure in Pa, and wind speed in m/s.

NASA has [archived the Mars Rover Photos API](https://api.nasa.gov/). The image page now uses the [NASA Image and Video Library search API](https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf) with image-only keyword search, rover search shortcuts, and page navigation. This is a general media collection, so results are not guaranteed to be raw rover photographs and sol/camera filters are not available. The page links to NASA’s Curiosity and Perseverance raw-image galleries for mission-specific browsing.

APOD and image search show API failures, empty results, loading, and input errors. Requests are not retried automatically. The public pages can be verified with deterministic mocked browser responses; live APOD and image data depend on NASA’s service availability.
