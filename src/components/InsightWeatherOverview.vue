<template>
  <div>
    <v-card
      class="pa-4 mb-4"
    >
      <h1 class="uppercase mb-2">
        InSight: Mars Weather Service API
      </h1>
      <p>Per-sol summaries from the last available Martian days.</p>
      <p>Missing sensor readings appear as gaps in the charts.</p>
      <a
        href="https://science.nasa.gov/mission/insight/"
        target="_blank"
        rel="noopener noreferrer"
      >
        NASA InSight mission archive
      </a>
    </v-card>
    <v-row v-if="weatherReports.length">
      <v-col
        v-for="chart in weatherCharts"
        :key="chart.title"
        cols="12"
      >
        <v-card
          outlined
          class="pa-4"
        >
          <h2 class="chart-title">
            {{ chart.title }} <span>({{ chart.unit }})</span>
          </h2>
          <InsightWeatherChart
            v-if="chart.hasMeasurements"
            :chart-data="chart.chartData"
            :title="chart.label"
            :unit="chart.unit"
          />
          <p
            v-else
            class="chart-empty"
          >
            No data available
          </p>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { DailyWeather } from '@/types/nasa';
import { buildWeatherChartData } from '@/utils/insightWeather';
import InsightWeatherChart from '@/components/InsightWeatherChart.vue';

export default defineComponent({
  name: 'InsightWeatherOverview',
  components: { InsightWeatherChart },
  props: {
    weatherReports: {
      type: Array as PropType<DailyWeather[]>,
      required: true,
    },
  },
  computed: {
    weatherCharts() {
      const metricCharts = [
        {
          title: 'Atmospheric Temperature',
          unit: '°C',
          metric: 'AT',
        },
        {
          title: 'Atmospheric Pressure',
          unit: 'Pa',
          metric: 'PRE',
        },
        {
          title: 'Horizontal Wind Speed',
          unit: 'm/s',
          metric: 'HWS',
        },
      ] as const;

      return metricCharts.map((metricChart) => {
        const chartData = buildWeatherChartData(
          this.weatherReports,
          metricChart.metric,
        );
        const hasMeasurements = chartData.datasets.some((dataset) => {
          return dataset.data.some((value) => {
            return value !== null;
          });
        });

        return {
          title: metricChart.title,
          label: `${metricChart.title} (${metricChart.unit})`,
          unit: metricChart.unit,
          chartData,
          hasMeasurements,
        };
      });
    },
  },
});
</script>

<style scoped>
.chart-title {
  color: #39ff14;
  font-size: 1.1rem;
  margin-bottom: 12px;
  text-transform: uppercase;
}
.chart-title span {
  color: #c8d8c4;
  font-weight: 400;
}
.chart-empty {
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 240px;
}
</style>
