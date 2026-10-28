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
  keywords?: string[];
  previewUrl: string;
}

export interface LibraryImageSearch {
  images: LibraryImage[];
  hasNextPage: boolean;
}

export interface WeatherMeasurement {
  av?: number | null;
  mn?: number | null;
  mx?: number | null;
  ct?: number;
}

export interface SolWeather {
  First_UTC?: string;
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
