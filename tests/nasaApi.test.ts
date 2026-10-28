import test, { afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { nasaApi } from '../src/services/nasaApi';

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});

test('APOD uses the new NASA service and accepts its array response', async () => {
  let requestedUrl = '';

  globalThis.fetch = async (input) => {
    requestedUrl = String(input);

    return new Response(JSON.stringify([{
      title: 'Today',
      date: '2026-10-28',
    }]));
  };
  const picture = await nasaApi.fetchAstronomyPicture();

  assert.equal(new URL(requestedUrl).hostname, 'science.nasa.gov');
  assert.equal(new URL(requestedUrl).pathname, '/wp-json/wp/v2/apod-basic');
  assert.equal(picture?.title, 'Today');
});

test('APOD handles an empty response without inventing a picture', async () => {
  globalThis.fetch = async () => {
    return new Response('[]');
  };
  assert.equal(await nasaApi.fetchAstronomyPicture(), null);
});

test('image searches request photos and use NASA page links for pagination', async () => {
  let requestedUrl = '';

  globalThis.fetch = async (input) => {
    requestedUrl = String(input);

    return new Response(JSON.stringify({
      collection: {
        items: [
          {
            data: [{
              nasa_id: 'PIA07081',
              title: 'Mars Rover Studies Soil',
            }],
            links: [{
              rel: 'preview',
              render: 'image',
              href: 'https://example.com/image.jpg',
            }],
          },
          {
            data: [{
              nasa_id: 'missing-preview',
              title: 'No preview',
            }],
            links: [],
          },
        ],
        links: [{
          rel: 'next',
          href: 'https://images-api.nasa.gov/search?page=3',
        }],
      },
    }));
  };
  const result = await nasaApi.searchLibraryImages('Mars rover', 2);
  const url = new URL(requestedUrl);

  assert.equal(url.hostname, 'images-api.nasa.gov');
  assert.equal(url.pathname, '/search');
  assert.equal(url.searchParams.get('q'), 'Mars rover');
  assert.equal(url.searchParams.get('media_type'), 'image');
  assert.equal(url.searchParams.get('page_size'), '25');
  assert.equal(url.searchParams.get('page'), '2');
  assert.deepEqual(result.images.map((image) => {
    return image.nasa_id;
  }), ['PIA07081']);
  assert.equal(result.hasNextPage, true);
});

test('image searches handle an empty last page', async () => {
  globalThis.fetch = async () => {
    return new Response(JSON.stringify({ collection: { items: [] } }));
  };
  const result = await nasaApi.searchLibraryImages('Spirit rover', 4);

  assert.deepEqual(result.images, []);
  assert.equal(result.hasNextPage, false);
});

test('weather requests use the documented version and reject failed HTTP responses', async () => {
  let request: URL | null = null;

  globalThis.fetch = async (input) => {
    request = new URL(String(input));

    return new Response('Rate limited', { status: 429 });
  };
  await assert.rejects(nasaApi.fetchInsightWeather(), /429/);
  assert.ok(request);
  assert.equal((request as URL).searchParams.get('ver'), '1.0');
});
