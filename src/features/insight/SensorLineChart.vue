<template>
  <div class="weather-chart">
    <canvas
      ref="canvas"
      role="img"
      :aria-label="title"
    >{{ title }}</canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { PropType } from 'vue';
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Legend,
  Tooltip,
} from 'chart.js';
import type { ChartData, ChartOptions } from 'chart.js';

Chart.register(
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Legend,
  Tooltip,
);

const weatherChartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  plugins: {
    legend: {
      display: true,
      labels: {
        usePointStyle: true,
        font: { size: 12 },
        boxWidth: 8,
        color: '#30DA11',
      },
    },
    tooltip: { displayColors: false },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: '#30DA11',
        font: { size: 12 },
        autoSkipPadding: 20,
        maxRotation: 0,
      },
    },
    y: {
      beginAtZero: false,
      grid: { display: false },
      ticks: {
        color: '#30DA11',
        font: { size: 12 },
        callback(value) {
          if (Number(value) >= 1000) {
            return `${Intl.NumberFormat().format(Number(value) / 1000)}k`;
          }

          return value;
        },
      },
    },
  },
};

export default defineComponent({
  name: 'SensorLineChart',
  props: {
    chartData: {
      type: Object as PropType<ChartData<'line', (number | null)[], string>>,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const canvas = ref<HTMLCanvasElement | null>(null);
    let chart: Chart<'line', (number | null)[], string> | null = null;

    function renderWeatherChart(): void {
      if (!canvas.value) {
        return;
      }

      chart?.destroy();
      chart = new Chart(canvas.value, {
        type: 'line',
        data: props.chartData,
        options: weatherChartOptions,
      });
    }

    onMounted(renderWeatherChart);
    watch(() => {
      return props.chartData;
    }, renderWeatherChart);
    onBeforeUnmount(() => {
      chart?.destroy();
    });

    return { canvas };
  },
});
</script>

<style scoped>
.weather-chart {
  position: relative;
  height: 28vh;
  min-height: 180px;
}
</style>
