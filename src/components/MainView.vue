<template>
  <v-main>
    <narvar />

    <router-view />

    <main-footer />
  </v-main>
</template>

<script>
import Narvar from './Narvar.vue'
import MainFooter from './MainFooter'
export default {
  name: 'MainView',
  components: {
    Narvar,
    MainFooter,
  },
}
</script>
