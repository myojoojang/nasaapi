<template>
  <v-row>
    <v-col
      cols="12"
      lg="10"
    >
      <v-card
        outlined
        class="pa-4"
        height="100%"
      >
        <section
          v-for="chart in weatherCharts"
          :key="chart.title"
        >
          <mark class="uppercase">{{ chart.title }}</mark>
          <v-sheet
            outlined
            class="chart-container ma-2"
          >
            <InsightWeatherChart
              v-if="chart.hasMeasurements"
              :chart-data="chart.chartData"
              :title="chart.title"
            />
            <div
              v-else
              class="text-center primary--text"
            >
              No data available
            </div>
          </v-sheet>
        </section>
      </v-card>
    </v-col>
    <v-col
      cols="12"
      lg="2"
    >
      <v-card
        outlined
        height="100%"
        class="pa-4"
      >
        <h1 class="uppercase mb-4">
          InSight: Mars Weather Service API
        </h1>
        <mark>Per-sol summaries from the last available Martian days.</mark>
        <p>
          Some sols have no temperature, pressure, or wind measurements.
          Gaps stay empty in the charts.
        </p>
        <a
          href="https://science.nasa.gov/mission/insight/"
          target="_blank"
          rel="noopener noreferrer"
        >
          NASA InSight mission archive
        </a>
      </v-card>
    </v-col>
  </v-row>
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
          title: 'Atmospheric Temperature (°C)',
          metric: 'AT',
        },
        {
          title: 'Atmospheric Pressure (Pa)',
          metric: 'PRE',
        },
        {
          title: 'Horizontal Wind Speed (m/s)',
          metric: 'HWS',
        },
      ] as const;

      return metricCharts.map((metricChart) => {
        const chartData = buildWeatherChartData(this.weatherReports, metricChart.metric);
        const hasMeasurements = chartData.datasets.some((dataset) => {
          return dataset.data.some((value) => {
            return value !== null;
          });
        });

        return {
          title: metricChart.title,
          chartData,
          hasMeasurements,
        };
      });
    },
  },
});
</script>

<style scoped>
.chart-container {
  min-height: 180px;
}
</style>
