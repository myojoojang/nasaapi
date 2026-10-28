import type { AstronomyPicture } from '../types/nasa';

export function safeMediaUrl(url: string | undefined): string {
  if (!url) {
    return '';
  }

  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.protocol === 'https:' || parsedUrl.protocol === 'http:') {
      return parsedUrl.href;
    }
  } catch {
    return '';
  }

  return '';
}

export function getAstronomyImageUrl(picture: AstronomyPicture): string {
  // The new APOD service uses url for the article and hdurl for its preview image.
  if (picture.hdurl) {
    return safeMediaUrl(picture.hdurl);
  }

  if (picture.media_type === 'image' && !picture.permalink) {
    return safeMediaUrl(picture.url);
  }

  return '';
}

export function plainTextFromHtml(html: string): string {
  const document = new DOMParser().parseFromString(html, 'text/html');

  return document.body.textContent ?? '';
}
