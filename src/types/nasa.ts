export interface AstronomyPicture {
  date: string;
  title: string;
  explanation: string;
  media_type: 'image' | 'video' | 'other';
  url: string;
  hdurl?: string;
  permalink?: string;
  copyright?: string;
  credit?: string;
  alt?: string;
}

export interface LibraryImage {
  nasa_id: string;
  title: string;
  date_created?: string;
  description?: string;
  center?: string;
  previewUrl: string;
}

export interface LibraryImageSearch {
  images: LibraryImage[];
  hasNextPage: boolean;
}

export interface ImageLibrarySearchResponse {
  collection: {
    items: Array<{
      data?: Array<Omit<LibraryImage, 'previewUrl'>>;
      links?: Array<{ href: string; rel: string; render?: string }>;
    }>;
    links?: Array<{ rel: string }>;
  };
}

export interface WeatherMeasurement {
  av?: number | null;
  mn?: number | null;
  mx?: number | null;
  ct?: number;
}

export interface SolWeather {
  Last_UTC?: string;
  Northern_season?: string;
  Southern_season?: string;
  AT?: WeatherMeasurement;
  PRE?: WeatherMeasurement;
  HWS?: WeatherMeasurement;
  WD?: { most_common?: { compass_point?: string } | null };
}

export interface InsightWeatherResponse {
  sol_keys?: string[];
  [key: string]: unknown;
}

export interface DailyWeather extends SolWeather {
  sol: string;
}

export type WeatherMetric = 'AT' | 'PRE' | 'HWS';
