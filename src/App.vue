<template>
  <v-app>
    <main-view />
  </v-app>
</template>

<script>
import MainView from "./components/MainView";

export default {
  name: "App",

  components: {
    MainView,
  },

  data: () => ({
    data: [],
    showLoading: false,
  }),
};
</script>
<style>
* {
  font-family: "Zilla Slab", serif;
}

body {
  -webkit-transition: all 0.6s ease;
  -moz-transition: all 0.6s ease;
  -o-transition: all 0.6s ease;
  transition: all 0.6s ease;
}


body::-webkit-scrollbar {
  display: none;
}

body .theme--dark.v-application {
  color: #39ff14;
}

.v-sheet.v-card {
  border-radius: 0 !important;
  color: #39ff14;
}

.v-btn {
  border-radius: 0 !important;
  color: #39ff14;
}

.theme--dark.v-sheet--outlined {
  border: 1px solid #39ff14 !important;
}
.uppercase {
  text-transform: uppercase;
}
.lowercase {
  text-transform: lowercase;
}
a {
  text-decoration: none;
}
body .v-application p {
  margin-bottom: 6px;
}

mark {
  background: #39ff14;
  font-weight: 700;
  color: black !important;
  font-size: 1.2rem;
}
.small-text {
  font-size: 0.8rem;
}

.bold-outline {
  border: 2px solid #39ff14 !important;
  margin: 2px;
}

.pointer {
  cursor: pointer;
}
</style>
