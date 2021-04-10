<template>
  <div class="pa-4">
    <weather-chart :data="data" v-if="isMounted" />
    <v-row class="mt-2">
      <v-col cols="12" md="2">
        <v-card class="pa-4" outlined height="100%">
          <mark>Notice</mark>
          <div>
            Kindly let you know the data is purely based on Nasa Insight API. If
            there is any 'no data' or empty data space, It means the nasa's
            rovers are having hard time to pick weather related data on Mars.
            <br />
            Kudos for all the rovers!
          </div>
        </v-card>
      </v-col>
      <template v-for="(el, index) of data">
        <daily-weather-box :key="index" :data="el" />
      </template>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
import DailyWeatherBox from "./DailyWeatherBox";
import WeatherChart from "./WeatherChart";
import { API_KEY, API_PREFIX } from "@/GlobalVars";
export default {
  name: "Weather",
  components: {
    DailyWeatherBox,
    WeatherChart,
  },
  data: () => ({
    data: [],
    isMounted: false,
  }),
  created() {
    this.getData();
  },
  methods: {
    getData() {
      axios({
        method: "get",
        url: `${API_PREFIX}/insight_weather/?api_key=${API_KEY}&feedtype=json`,
      })
        .then((res) => {
          const data = res.data;
          this.sortData(data);
        })
        .catch((err) => console.error(err));
    },
    sortData(data) {
      const tmp = [];

      for (let [key, value] of Object.entries(data)) {
        tmp.push({
          date: key,
          ...value,
        });
      }

      this.data = tmp.slice(0, -2);
      this.isMounted = true;
    },
  },
};
</script>

<style></style>
