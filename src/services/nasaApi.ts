import type {
  AstronomyPicture,
  ImageLibrarySearchResponse,
  LibraryImageSearch,
} from '../types/nasa';

const APOD_API_URL = 'https://science.nasa.gov/wp-json/wp/v2/apod-basic';
const IMAGE_LIBRARY_URL = 'https://images-api.nasa.gov/search';

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
  async searchLibraryImages(searchTerms: string, page: number): Promise<LibraryImageSearch> {
    const response = await fetchNasaJson<ImageLibrarySearchResponse>(IMAGE_LIBRARY_URL, {
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
