import test from 'node:test';
import assert from 'node:assert/strict';
import { safeMediaUrl, getAstronomyImageUrl } from '../src/utils/media';
import type { AstronomyPicture } from '../src/types/nasa';

test('APOD uses hdurl as the image rather than the new article url', () => {
  const picture: AstronomyPicture = {
    title: 'Jupiter',
    date: '2026-10-28',
    explanation: '',
    media_type: 'video',
    url: 'https://science.nasa.gov/article/',
    permalink: 'https://science.nasa.gov/article/',
    hdurl: 'https://assets.science.nasa.gov/jupiter.jpg',
  };

  assert.equal(getAstronomyImageUrl(picture), picture.hdurl);
  assert.equal(getAstronomyImageUrl({
    ...picture,
    hdurl: undefined,
  }), '');
});

test('media links reject executable and invalid URLs', () => {
  assert.equal(safeMediaUrl('javascript:alert(1)'), '');
  assert.equal(safeMediaUrl('not a url'), '');
  assert.equal(safeMediaUrl('https://science.nasa.gov/image.jpg'), 'https://science.nasa.gov/image.jpg');
});
