<template>
  <div class="page-view">
    <InsightWeatherOverview :weather-reports="weatherReports" />
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
import { insightWeatherArchive } from '@/data/insightWeather';
import { getDailyWeatherReports } from '@/utils/insightWeather';
import InsightWeatherOverview from '@/components/InsightWeatherOverview.vue';
import InsightWeatherCard from '@/components/InsightWeatherCard.vue';

export default defineComponent({
  name: 'InsightWeatherView',
  components: {
    InsightWeatherOverview,
    InsightWeatherCard,
  },
  data() {
    return {
      weatherReports: getDailyWeatherReports(insightWeatherArchive),
    };
  },
});
</script>
