import test from 'node:test';
import assert from 'node:assert/strict';
import { getDailyWeatherReports, buildWeatherChartData, formatWeatherValue } from '../src/features/insight/weatherData';
import type { DailyWeather } from '../src/types/nasa';

test('weather reports follow sol_keys, not response property order or metadata position', () => {
  const response = {
    validity_checks: { sol_hours_required: 18 },
    '102': { PRE: { av: 700 } },
    sol_keys: ['101', '102', '103'],
    '101': { AT: { av: -50 } },
    unrelated: { AT: { av: 999 } },
  };
  const reports = getDailyWeatherReports(response);

  assert.deepEqual(reports.map((report) => {
    return report.sol;
  }), ['101', '102']);
  assert.equal(reports[0].AT?.av, -50);
  assert.equal(reports[1].PRE?.av, 700);
  assert.deepEqual(getDailyWeatherReports({ validity_checks: {} }), []);
});

test('missing measurements remain gaps on their own sol rather than shifting later readings', () => {
  const reports: DailyWeather[] = [
    {
      sol: '101',
      AT: {
        av: -50,
        mn: -80,
        mx: 0,
        ct: 10,
      },
    },
    {
      sol: '102',
      PRE: { av: 700 },
    },
    {
      sol: '103',
      AT: {
        av: -40,
        mn: -70,
        mx: 2,
      },
    },
  ];
  const chart = buildWeatherChartData(reports, 'AT');

  assert.deepEqual(chart.labels, ['SOL 101', 'SOL 102', 'SOL 103']);
  assert.deepEqual(chart.datasets.map((dataset) => {
    return dataset.data;
  }), [[-50, null, -40], [-80, null, -70], [0, null, 2]]);
  assert.equal(chart.datasets.length, 3);
  assert.equal(chart.datasets[0].spanGaps, false);
  assert.deepEqual(buildWeatherChartData(reports, 'PRE').datasets[0].data, [null, 700, null]);
});

test('weather formatting preserves zero, distinguishes missing values, and uses supplied units', () => {
  assert.equal(formatWeatherValue(0, '°C'), '0 °C');
  assert.equal(formatWeatherValue(700, 'Pa'), '700 Pa');
  assert.equal(formatWeatherValue(3.2, 'm/s'), '3.2 m/s');
  assert.equal(formatWeatherValue(undefined, 'Pa'), 'N/D');
  assert.equal(formatWeatherValue(null, 'Pa'), 'N/D');
});
