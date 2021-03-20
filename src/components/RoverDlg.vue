<template>
  <v-card height="40%" width="40%" rounded="0">
    <div class="d-flex justify-end">
      <span @click="$emit('rover-dlg-close')">닫기</span>
    </div>
    <v-card-text class="pa-4">
      {{ data }}

      <!-- { "id": 5, "name": "Curiosity", "landing_date": "2012-08-06", "launch_date": "2011-11-26", "status": "active" } -->
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'RoverDlg',
  props: {
    data: { type: Object, default: null },
  },
}
</script>

<style></style>
