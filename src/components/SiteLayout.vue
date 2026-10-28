<template>
  <v-main>
    <SiteNavigation />
    <router-view />
    <footer class="d-flex justify-end mr-4 my-1">
      Data and imagery from NASA.
    </footer>
  </v-main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SiteNavigation from './SiteNavigation.vue';

export default defineComponent({
  name: 'SiteLayout',
  components: { SiteNavigation },
});
</script>
