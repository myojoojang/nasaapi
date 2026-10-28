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
      color: '#39ff14',
      pointStyle: 'circle',
      borderDash: [],
    },
    {
      field: 'mn',
      label: 'Minimum',
      color: '#4dd0e1',
      pointStyle: 'rectRot',
      borderDash: [6, 4],
    },
    {
      field: 'mx',
      label: 'Maximum',
      color: '#ffb74d',
      pointStyle: 'triangle',
      borderDash: [2, 4],
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
        borderColor: measurement.color,
        backgroundColor: measurement.color,
        borderDash: [...measurement.borderDash],
        borderWidth: measurement.field === 'av' ? 3 : 2,
        pointStyle: measurement.pointStyle,
        pointRadius: 4,
        pointHoverRadius: 7,
        pointBackgroundColor: measurement.color,
        pointHoverBackgroundColor: measurement.color,
        fill: false,
        spanGaps: false,
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
