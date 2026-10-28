import type {
  AstronomyPicture,
  InsightWeatherResponse,
  LibraryImage,
  LibraryImageSearch,
} from '../types/nasa';

const NASA_API_URL = 'https://api.nasa.gov';
const APOD_API_URL = 'https://science.nasa.gov/wp-json/wp/v2/apod-basic';
const IMAGE_LIBRARY_URL = 'https://images-api.nasa.gov/search';
const nasaApiKey = import.meta.env?.VITE_NASA_API_KEY || 'DEMO_KEY';

async function fetchNasaJson<ResponseData>(
  endpoint: string,
  queryParameters: Record<string, string> = {},
): Promise<ResponseData> {
  const requestUrl = new URL(endpoint);

  requestUrl.search = new URLSearchParams(queryParameters).toString();
  const response = await fetch(requestUrl);

  if (!response.ok) {
    throw new Error(`NASA request failed (${response.status}).`);
  }

  return response.json();
}

export const nasaApi = {
  async fetchAstronomyPicture(): Promise<AstronomyPicture | null> {
    const response = await fetchNasaJson<AstronomyPicture | AstronomyPicture[]>(APOD_API_URL);

    if (Array.isArray(response)) {
      return response[0] ?? null;
    }

    return response;
  },
  async fetchInsightWeather(): Promise<InsightWeatherResponse> {
    return fetchNasaJson<InsightWeatherResponse>(`${NASA_API_URL}/insight_weather/`, {
      api_key: nasaApiKey,
      feedtype: 'json',
      ver: '1.0',
    });
  },
  async searchLibraryImages(searchTerms: string, page: number): Promise<LibraryImageSearch> {
    interface SearchResponse {
      collection: {
        items: Array<{
          data?: Array<Omit<LibraryImage, 'previewUrl'>>;
          links?: Array<{ href: string; rel: string; render?: string }>;
        }>;
        links?: Array<{ rel: string }>;
      };
    }

    const response = await fetchNasaJson<SearchResponse>(IMAGE_LIBRARY_URL, {
      q: searchTerms,
      media_type: 'image',
      page: String(page),
      page_size: '25',
    });
    const images = response.collection.items.flatMap((item) => {
      const details = item.data?.[0];
      const preview = item.links?.find((link) => {
        return link.rel === 'preview' && link.render === 'image';
      });

      if (!details?.nasa_id || !preview?.href) {
        return [];
      }

      return [{
        ...details,
        previewUrl: preview.href,
      }];
    });
    const hasNextPage = response.collection.links?.some((link) => {
      return link.rel === 'next';
    }) ?? false;

    return {
      images,
      hasNextPage,
    };
  },
};
