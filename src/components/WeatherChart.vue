<template>
  <v-row>
    <v-col cols="12" lg="10">
      <v-card outlined class="pa-4" height="100%">
        <div>
          <mark class="uppercase">ATMOSPHERIC TEMPERATURE</mark>
          <v-sheet outlined class="chart-container ma-2" v-if="showChart">
            <div v-if="atData.length < 1" class="text-center primary--text">
              No data available
            </div>
            <template v-else>
              <line-chart
                :v-if="isChartLoaded"
                :options="option"
                :chartdata="atChartData"
              />
            </template>
          </v-sheet>
        </div>
        <div>
          <mark class="uppercase">Atmospheric Pressure</mark>
          <v-sheet outlined class="chart-container ma-2" v-if="showChart">
            <div v-if="preData.length < 1" class="text-center primary--text">
              No data available
            </div>
            <template v-else>
              <line-chart
                :v-if="isChartLoaded"
                :options="option"
                :chartdata="preChartData"
              />
            </template>
          </v-sheet>
        </div>

        <div>
          <mark class="uppercase">Horizontal Wind Speed</mark>
          <v-sheet outlined class="chart-container ma-2" v-if="showChart">
            <div v-if="wsData.length < 1" class="text-center primary--text">
              No data available
            </div>
            <template v-else>
              <line-chart
                :v-if="isChartLoaded"
                :options="option"
                :chartdata="wsChartData"
              />
            </template>
          </v-sheet>
        </div>
      </v-card>
    </v-col>
    <v-col cols="12" lg="2">
      <v-card outlined height="100%" class="pa-4">
        <h1 class="uppercase mb-4">InSight: Mars Weather Service API</h1>
        <mark>
          Mars Weather API provides per-Sol summary data for each of the last
          seven available Sols (Martian Days).
        </mark>
        <p>
          please note that wind and other sensor data may not exist for certain
          date ranges. You can check out
          <mark>
            <a
              class="font-weght-bold uppercase black--text"
              href="https://mars.nasa.gov/insight/weather/"
            >
              Here
            </a>
          </mark>
          and scroll down to the 'seasonal weather report' you'll see the gaps
          where no data exists for some sensors.
        </p>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import LineChart from "./partial/LineChart.vue";
export default {
  components: { LineChart },
  name: "WeatherChart",
  props: {
    data: { type: Array, default: null },
  },
  data: () => ({
    isChartLoaded: false,
    option: {},
    chartData: {},
    showChart: false,

    preData: [],
    atData: [],
    wsData: [],
    preChartData: {},
    atChartData: {},
    wsChartData: {},
    xLabels: [],
  }),

  mounted() {
    this.sortData();
  },
  methods: {
    sortData() {
      this.isChartLoaded = false;
      this.showChart = false;

      for (let el of this.data) {
        this.xLabels.push(el.date);

        console.log(el);

        if (el.PRE) {
          for (let [key, value] of Object.entries(el.PRE)) {
            this.preData.push({
              label: key,
              value: value,
            });
          }
          this.preChartData = this.setChartData(this.preData);
        }
        if (el.AT) {
          for (let [key, value] of Object.entries(el.AT)) {
            this.atData.push({
              label: key,
              value: value,
            });
          }
          this.atChartData = this.setChartData(this.atData);
        }
        if (el.HWS) {
          for (let [key, value] of Object.entries(el.HWS)) {
            this.wsData.push({
              label: key,
              value: value,
            });
          }
          this.wsChartData = this.setChartData(this.wsData);
        }
      }
      this.showTimestampChart();
    },
    setChartData(data) {
      let tempLabel = [];
      data.forEach(function (el) {
        if (el.label !== "ct") tempLabel.push(el.label);
      });

      const tempArray = tempLabel;
      tempLabel = Array.from(new Set(tempArray.map(JSON.stringify))).map(
        JSON.parse
      );

      const putDataSet = [];
      tempLabel.forEach(function (el) {
        putDataSet.push({
          label: el,
          data: [],
          borderWidth: 4,
          pointRadius: 4,
          fill: false,
          borderColor: "#30DA11",
        });
      });

      data.forEach(function (el) {
        putDataSet.forEach(function (it) {
          if (el.label === it.label && el.label !== "ct") {
            it.data.push(el.value);
          }
        });
      });
      const dataSet = {
        labels: this.xLabels,
        datasets: putDataSet,
      };

      return dataSet;
    },

    showTimestampChart() {
      this.option = {
        legend: {
          display: true,
          labels: {
            usePointStyle: true,
            fontSize: 12,
            boxWidth: 8,
            fontColor: "#30DA11",
          },
        },
        tooltips: {
          displayColors: false,
        },
        scales: {
          yAxes: [
            {
              stacked: false,
              ticks: {
                fontColor: "#30DA11",
                fontSize: 12,
                beginAtZero: false,
                callback: (value) => {
                  if (value >= 1000) {
                    return Intl.NumberFormat().format(value / 1000) + "k";
                  } else {
                    return value;
                  }
                },
              },
              gridLines: {
                display: false,
              },
            },
          ],
          xAxes: [
            {
              stacked: false,
              gridLines: {
                display: false,
              },

              ticks: {
                fontColor: "#30DA11",
                fontSize: 12,
                autoSkip: true,
                autoSkipPadding: 20,
                maxRotation: 0,
              },
            },
          ],
        },
        responsive: true,
        maintainAspectRatio: false,
      };

      this.isChartLoaded = true;
      this.showChart = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.chart-container {
  flex-grow: 1;
  min-height: 0;

  > div {
    position: relative;
    height: 28vh;
    min-height: 180px;
    padding-left: 0;
  }
}
</style>
