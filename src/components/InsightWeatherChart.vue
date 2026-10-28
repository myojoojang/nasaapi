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

function createWeatherChartOptions(unit: string): ChartOptions<'line'> {
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'start',
        labels: {
          usePointStyle: true,
          color: '#e8f5e5',
          padding: 16,
          font: { size: 13 },
        },
      },
      tooltip: {
        callbacks: {
          label(context) {
            return `${context.dataset.label}: ${context.formattedValue} ${unit}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Martian sol',
          color: '#c8d8c4',
        },
        grid: { display: false },
        ticks: {
          color: '#c8d8c4',
          maxRotation: 0,
          autoSkipPadding: 20,
        },
      },
      y: {
        grace: '10%',
        title: {
          display: true,
          text: unit,
          color: '#c8d8c4',
        },
        grid: { color: 'rgba(200, 216, 196, 0.16)' },
        ticks: {
          color: '#c8d8c4',
          maxTicksLimit: 6,
        },
      },
    },
  };
}

export default defineComponent({
  name: 'InsightWeatherChart',
  props: {
    chartData: {
      type: Object as PropType<ChartData<'line', (number | null)[], string>>,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    unit: {
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
        options: createWeatherChartOptions(props.unit),
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
  height: 280px;
}
</style>
