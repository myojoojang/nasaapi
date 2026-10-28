<template>
  <v-app>
    <v-main>
      <div class="app-shell">
        <AppNavigation />
        <router-view />
        <footer class="d-flex justify-end mr-4 my-1">
          Data and imagery from NASA.
        </footer>
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppNavigation from './components/AppNavigation.vue';

export default defineComponent({
  name: 'App',
  components: { AppNavigation },
});
</script>

<style scoped>
.app-shell {
  margin: 0 auto;
  max-width: 1440px;
  padding: 24px;
}
@media (max-width: 600px) {
  .app-shell {
    padding: 16px;
  }
}
</style>
