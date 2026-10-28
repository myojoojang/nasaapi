<template>
  <nav
    class="pa-4"
    aria-label="Main navigation"
  >
    <div class="site-title text-center uppercase">
      <h2>
        <router-link
          to="/"
          class="hover px-4"
        >
          NASA API Experiment
        </router-link>
      </h2>
    </div>
    <div class="d-flex align-center flex-wrap">
      <v-card class="px-4 hover bold-outline">
        <router-link to="/insight">
          Insight
        </router-link>
      </v-card>
      <div class="px-4 hover bold-outline">
        <router-link to="/marsphotos">
          NASA Images
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({ name: 'AppNavigation' });
</script>

<style scoped>
.site-title {
  min-height: 50px;
}
.hover:hover {
  font-weight: 700;
  transition: all 0.4s ease;
  border: 3px solid #39ff14 !important;
}
</style>
