# NASA API Experiment

A Vue dashboard for NASA’s Astronomy Picture of the Day (APOD), InSight weather reports, and NASA library images. The original green-on-black visual style and `#/`, `#/insight`, and `#/marsphotos` routes are retained.

## Development

Use Node.js 24. Install dependencies and run the Vite server:

```sh
nvm use
npm ci
npm run dev
```

`npm run serve` is an alias for the development server. `npm run check` runs lint, tests, TypeScript checking, and the production build. `npm run preview` serves the built app locally.

To use your NASA API key for InSight weather, copy `.env.example` to `.env.local` and set `VITE_NASA_API_KEY`. Without it, the app uses NASA’s `DEMO_KEY`, which has lower rate limits. Vite exposes `VITE_` variables in browser code, so this is a public client-side key, not a secret. The original hard-coded key was moved to the ignored local environment file; a key previously committed to Git remains in repository history and should be rotated if it is still active.

## Structure

```text
src/
  features/astronomy/     APOD page
  features/insight/       InSight page, sol cards, sensor charts, weather data
  features/images/        NASA image search, cards, pagination
  components/layout/     Shared navigation and page shell
  components/media/      Details dialog shared by APOD and library images
  services/nasaApi.ts     Typed NASA requests
  types/nasa.ts           NASA response shapes
  utils/media.ts          Safe media URLs and plain-text APOD metadata
  router.ts               Existing hash routes
  styles/app.css          Original green-on-black theme
```

The build uses Vue 2.7, Vuetify 2, Vue Router 3, Chart.js 4, TypeScript, and Vite 7. Pages load by route. CI and Netlify run `npm run check` before deployment. Vue 2 and Vuetify 2 remain to preserve the application’s look; moving to a newer UI stack is a separate project.

## API behavior

APOD uses NASA’s [current APOD endpoint](https://api.nasa.gov/). That response may contain an article link in `url` and a preview image in `hdurl`. The page uses the image for previews and links video entries to the NASA article. Explanations and credits are shown as plain text.

InSight weather uses the documented [weather API](https://api.nasa.gov/assets/insight/InSight%20Weather%20API%20Documentation.pdf). Weather reports follow `sol_keys`; missing readings stay empty on their own sol, while available zero values remain zero. Cards show temperature in °C, pressure in Pa, and wind speed in m/s. InSight is a completed mission, so its reports are archival.

NASA has [archived the Mars Rover Photos API](https://api.nasa.gov/). The image page now uses the [NASA Image and Video Library search API](https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf) with image-only keyword search, rover search shortcuts, and page navigation. This is a general media collection, so results are not guaranteed to be raw rover photographs and sol/camera filters are not available. The page links to NASA’s Curiosity and Perseverance raw-image galleries for mission-specific browsing.

API failures, empty results, loading, and input errors are visible. Requests are not retried automatically. The public pages can be verified with deterministic mocked browser responses; live data depends on NASA’s service availability.
