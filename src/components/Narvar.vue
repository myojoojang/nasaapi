<template>
  <div class="pa-4">
    <div style="height: 50px;" class="text-center uppercase">
      <h2>
        <router-link to="/" class="hover px-4">
          NASA API Experiment
        </router-link>
      </h2>
    </div>
    <div class="d-flex align-center" style="height: 40px;">
      <v-card class="px-4 hover bold-outline">
        <router-link to="/insight">Insight</router-link>
      </v-card>
      <div class="px-4 hover bold-outline">
        <router-link to="/marsphotos">Mars Rover Photos</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Narvar',
  props: {},
}
</script>

<style scoped>
.hover:hover {
  font-weight: 700;
  transition: all 0.4s ease;
  border: 3px solid #39ff14 !important;
}
</style>
