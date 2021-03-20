<template>
  <v-col cols="12" md="2">
    <v-card class="pa-2" outlined height="100%">
      <div>
        <div class="uppercase text-center">
          <h2 class="font-weight-bold">Sol {{ data.date }}</h2>
          <p>>{{ new Date(data.Last_UTC).toLocaleDateString('en-US') }}</p>
        </div>
        <p class="uppercase font-weight-bold">
          Northern Season
        </p>
        <div class="ml-2">
          <p>>{{ data.Northern_season }}</p>
        </div>

        <p class="uppercase font-weight-bold">
          Southern Season
        </p>
        <div class="ml-2">
          <p>>{{ data.Southern_season }}</p>
        </div>

        <div v-if="data.AT">
          <p class="uppercase font-weight-bold">Atmospheric Temperature</p>
          <div class="ml-2">
            <p>>Average: {{ `${data.PRE.av} Pa` || 'N/D' }}</p>
            <p>>Max: {{ `${data.PRE.mx} Pa` || 'N/D' }}</p>
            <p>>Min: {{ `${data.PRE.mn} Pa` || 'N/D' }}</p>
          </div>
        </div>
        <div v-else>
          <p class="uppercase font-weight-bold">
            Atmospheric Temperature
          </p>
          <div class="ml-2">
            <p>>{{ data.AT || 'N/D' }}</p>
          </div>
        </div>

        <div v-if="data.PRE">
          <p class="uppercase font-weight-bold">Atmospheric Pressure</p>
          <div class="ml-2">
            <p>>Average: {{ `${data.PRE.av} Pa` || 'N/D' }}</p>
            <p>>Max: {{ `${data.PRE.mx} Pa` || 'N/D' }}</p>
            <p>>Min: {{ `${data.PRE.mn} Pa` || 'N/D' }}</p>
          </div>
        </div>
        <div v-else>
          <p class="uppercase font-weight-bold">
            Atmospheric Pressure
          </p>
          <div class="ml-2">
            <p>>{{ data.PRE || 'N/D' }}</p>
          </div>
        </div>

        <p class="uppercase font-weight-bold">
          Wind Direction
        </p>
        <div class="ml-2">
          <p>>{{ data.WD.most_common || 'N/D' }}</p>
        </div>

        <div v-if="data.HWS">
          <p class="uppercase font-weight-bold">Horizontal Wind Speed</p>
          <div class="ml-2">
            <p>>Average: {{ `${data.HWS.av} Pa` || 'N/D' }}</p>
            <p>>Max: {{ `${data.HWS.mx} Pa` || 'N/D' }}</p>
            <p>>Min: {{ `${data.HWS.mn} Pa` || 'N/D' }}</p>
          </div>
        </div>
        <div v-else>
          <p class="uppercase font-weight-bold">
            Horizontal Wind Speed
          </p>
          <div class="ml-2">
            <p>>{{ data.HWS || 'N/D' }}</p>
          </div>
        </div>
      </div>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: 'DailyWeatherBox',
  props: {
    data: { type: Object, default: null },
  },
}
</script>

<style></style>
