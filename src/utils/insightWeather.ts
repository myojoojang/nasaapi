import type { ChartData } from 'chart.js';
import type { DailyWeather, InsightWeatherResponse, SolWeather, WeatherMetric } from '../types/nasa';

export function getDailyWeatherReports(response: InsightWeatherResponse): DailyWeather[] {
  const solKeys = response.sol_keys ?? [];

  return solKeys.flatMap((sol) => {
    const report = response[sol];

    if (!report || typeof report !== 'object' || Array.isArray(report)) {
      return [];
    }

    return [{
      sol,
      ...report as SolWeather,
    }];
  });
}

export function buildWeatherChartData(
  weatherReports: DailyWeather[],
  metric: WeatherMetric,
): ChartData<'line', (number | null)[], string> {
  const measurements = [
    {
      field: 'av',
      label: 'Average',
    },
    {
      field: 'mn',
      label: 'Minimum',
    },
    {
      field: 'mx',
      label: 'Maximum',
    },
  ] as const;

  return {
    labels: weatherReports.map((report) => {
      return `SOL ${report.sol}`;
    }),
    datasets: measurements.map((measurement) => {
      return {
        label: measurement.label,
        data: weatherReports.map((report) => {
          return report[metric]?.[measurement.field] ?? null;
        }),
        borderWidth: 3,
        pointRadius: 3,
        fill: false,
        spanGaps: false,
        borderColor: '#30DA11',
        pointHoverBackgroundColor: '#30DA11',
        pointHoverRadius: 6,
      };
    }),
  };
}

export function formatWeatherValue(value: number | null | undefined, unit: string): string {
  if (value == null || !Number.isFinite(value)) {
    return 'N/D';
  }

  return `${value} ${unit}`;
}
