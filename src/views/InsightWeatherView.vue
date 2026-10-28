<template>
  <div class="pa-4">
    <v-progress-linear
      v-if="isLoadingWeather"
      indeterminate
      aria-label="Loading Mars weather"
    />
    <v-alert
      v-if="weatherLoadError"
      type="error"
      outlined
      role="alert"
    >
      {{ weatherLoadError }}
      <v-btn
        text
        :disabled="isLoadingWeather"
        @click="loadWeatherReports"
      >
        Try again
      </v-btn>
    </v-alert>
    <InsightWeatherOverview :weather-reports="weatherReports" />
    <p
      v-if="!weatherReports.length && !isLoadingWeather && !weatherLoadError"
      class="my-4"
    >
      No weather reports are currently available from NASA.
    </p>
    <v-row class="mt-2">
      <v-col
        cols="12"
        md="2"
      >
        <v-card
          class="pa-4"
          outlined
          height="100%"
        >
          <mark>Notice</mark>
          <p>
            These reports come from the NASA InSight archive.
            Missing sensor measurements display N/D.
          </p>
        </v-card>
      </v-col>
      <InsightWeatherCard
        v-for="report in weatherReports"
        :key="report.sol"
        :weather-report="report"
      />
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { DailyWeather } from '@/types/nasa';
import { nasaApi } from '@/services/nasaApi';
import { getDailyWeatherReports } from '@/utils/insightWeather';
import InsightWeatherOverview from '@/components/InsightWeatherOverview.vue';
import InsightWeatherCard from '@/components/InsightWeatherCard.vue';

interface WeatherState {
  weatherReports: DailyWeather[];
  isLoadingWeather: boolean;
  weatherLoadError: string;
}

export default defineComponent({
  name: 'InsightWeatherView',
  components: {
    InsightWeatherOverview,
    InsightWeatherCard,
  },
  data(): WeatherState {
    return {
      weatherReports: [],
      isLoadingWeather: false,
      weatherLoadError: '',
    };
  },
  created() {
    this.loadWeatherReports();
  },
  methods: {
    async loadWeatherReports(): Promise<void> {
      this.isLoadingWeather = true;
      this.weatherLoadError = '';

      try {
        const response = await nasaApi.fetchInsightWeather();

        this.weatherReports = getDailyWeatherReports(response);
      } catch {
        this.weatherLoadError = 'Couldn’t load Mars weather. Please try again.';
      } finally {
        this.isLoadingWeather = false;
      }
    },
  },
});
</script>
