<template>
  <v-app>
    <v-main>
      <AppNavigation />
      <router-view />
      <footer class="d-flex justify-end mr-4 my-1">
        Data and imagery from NASA.
      </footer>
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
