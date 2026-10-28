<template>
  <div class="page-view">
    <v-alert
      v-if="weatherLoadError"
      type="error"
      outlined
      role="alert"
      class="mb-4"
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
    <div
      v-if="!weatherReports.length && !isLoadingWeather && !weatherLoadError"
      class="empty-state"
    >
      No weather reports are currently available from NASA.
    </div>
    <v-row
      v-if="weatherReports.length"
      class="mt-2"
    >
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
