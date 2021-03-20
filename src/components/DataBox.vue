<template>
  <v-col cols="12" md="4">
    <v-card outlined height="100%" class="my-2">
      <v-card-text>
        <v-img :src="photo.img_src" aspect-ratio="1.7" />
        <div>
          Taken by {{ photo.camera.full_name }} Earth Date :
          {{ photo.earth_date }}
        </div>
      </v-card-text>
    </v-card>

    <v-dialog
      scrollable
      persistent
      width="50vw"
      max-width="800px"
      v-model="isRoverDlgOpen"
    >
      <rover-dlg
        v-if="isRoverDlgOpen"
        :data="roverData"
        @rover-dlg-close="isRoverDlgOpen = false"
      />
    </v-dialog>
  </v-col>
</template>

<script>
import RoverDlg from './RoverDlg.vue'
export default {
  name: 'DataBox',
  components: {
    RoverDlg,
  },
  data: () => ({
    isRoverDlgOpen: false,
    roverData: {},
  }),
  props: {
    photo: { type: Object, default: null },
  },
  methods: {
    showRoverData(data) {
      console.log(data)
      this.roverData = data
      this.isRoverDlgOpen = true
    },
  },
}
</script>

<style></style>
