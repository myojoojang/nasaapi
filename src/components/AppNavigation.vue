<template>
  <nav
    class="pa-4"
    aria-label="Main navigation"
  >
    <div class="site-title text-center uppercase">
      <h2>
        <router-link
          to="/"
          class="site-home"
        >
          NASA API Experiment
        </router-link>
      </h2>
    </div>
    <div class="nav-tabs d-flex align-center flex-wrap">
      <router-link
        to="/"
        exact
        class="nav-tab"
        exact-active-class="nav-tab--active"
      >
        APOD: Astronomy Picture of the Day
      </router-link>
      <router-link
        to="/insight"
        class="nav-tab"
        exact-active-class="nav-tab--active"
      >
        Insight
      </router-link>
      <router-link
        to="/images"
        class="nav-tab"
        exact-active-class="nav-tab--active"
      >
        NASA Images
      </router-link>
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
.site-home {
  border-bottom: 2px solid transparent;
  color: #39ff14;
  display: inline-block;
}
.site-home:hover, .site-home:focus-visible {
  border-bottom-color: #39ff14;
}
.nav-tabs {
  gap: 12px;
}
.nav-tab {
  align-items: center;
  border: 2px solid #39ff14;
  color: #39ff14;
  display: inline-flex;
  font-size: 1.125rem;
  font-weight: 700;
  justify-content: center;
  min-height: 52px;
  min-width: 140px;
  max-width: 100%;
  padding: 0 18px;
  text-align: center;
  transition: background-color 0.2s ease, color 0.2s ease;
}
.nav-tab:hover, .nav-tab:focus-visible, .nav-tab--active {
  background-color: #39ff14;
  color: #111;
}
.nav-tab:focus-visible, .site-home:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 3px;
}
</style>
