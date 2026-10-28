<template>
  <v-col
    cols="12"
    md="2"
  >
    <v-card
      class="pa-2"
      outlined
      height="100%"
    >
      <div class="uppercase text-center">
        <h2 class="font-weight-bold">
          Sol {{ weatherReport.sol }}
        </h2>
        <p>&gt;{{ reportDate }}</p>
      </div>
      <p class="uppercase font-weight-bold">
        Northern Season
      </p>
      <p class="ml-2">
        &gt;{{ weatherReport.Northern_season || 'N/D' }}
      </p>
      <p class="uppercase font-weight-bold">
        Southern Season
      </p>
      <p class="ml-2">
        &gt;{{ weatherReport.Southern_season || 'N/D' }}
      </p>
      <section
        v-for="section in measurementSections"
        :key="section.title"
      >
        <p class="uppercase font-weight-bold">
          {{ section.title }}
        </p>
        <div class="ml-2">
          <p>&gt;Average: {{ formatWeatherValue(section.measurement?.av, section.unit) }}</p>
          <p>&gt;Max: {{ formatWeatherValue(section.measurement?.mx, section.unit) }}</p>
          <p>&gt;Min: {{ formatWeatherValue(section.measurement?.mn, section.unit) }}</p>
        </div>
      </section>
      <p class="uppercase font-weight-bold">
        Wind Direction
      </p>
      <p class="ml-2">
        &gt;{{ windDirection }}
      </p>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { DailyWeather } from '@/types/nasa';
import { formatWeatherValue } from '@/features/insight/weatherData';

export default defineComponent({
  name: 'SolWeatherCard',
  props: {
    weatherReport: {
      type: Object as PropType<DailyWeather>,
      required: true,
    },
  },
  computed: {
    reportDate(): string {
      if (!this.weatherReport.Last_UTC) {
        return 'N/D';
      }

      const timestamp = Date.parse(this.weatherReport.Last_UTC);

      if (!Number.isFinite(timestamp)) {
        return 'N/D';
      }

      return new Date(timestamp).toLocaleDateString('en-US', { timeZone: 'UTC' });
    },
    windDirection(): string {
      return this.weatherReport.WD?.most_common?.compass_point ?? 'N/D';
    },
    measurementSections() {
      return [
        {
          title: 'Atmospheric Temperature',
          measurement: this.weatherReport.AT,
          unit: '°C',
        },
        {
          title: 'Atmospheric Pressure',
          measurement: this.weatherReport.PRE,
          unit: 'Pa',
        },
        {
          title: 'Horizontal Wind Speed',
          measurement: this.weatherReport.HWS,
          unit: 'm/s',
        },
      ];
    },
  },
  methods: { formatWeatherValue },
});
</script>
