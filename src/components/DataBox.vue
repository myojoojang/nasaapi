<template>
  <v-col cols="12" md="4">
    <v-card outlined height="100%" class="my-2" @click="openDlg(photo)">
      <v-card-text>
        <v-img :src="photo.img_src" aspect-ratio="1.7" />
        <div class="primary--text mt-4">
          <h4>SOL {{ photo.sol }} Taken by {{ photo.rover.name }}</h4>
          from {{ photo.camera.full_name }}
          <p class="ma-0">Earth Date : {{ photo.earth_date }}</p>
        </div>
      </v-card-text>
    </v-card>

    <v-dialog
      scrollable
      persistent
      width="80vw"
      max-width="800px"
      v-model="isDetailDlgOpen"
    >
      <detail-dlg
        v-if="isDetailDlgOpen"
        :data="detailData"
        @detail-dlg-close="isDetailDlgOpen = false"
      />
    </v-dialog>
  </v-col>
</template>

<script>
import DetailDlg from "./DetailDlg.vue";
export default {
  name: "DataBox",
  components: {
    DetailDlg,
  },
  data: () => ({
    isDetailDlgOpen: false,
    detailData: {},
  }),
  props: {
    photo: { type: Object, default: null },
  },
  methods: {
    openDlg(data) {
      console.log(data);
      this.detailData = data;
      this.isDetailDlgOpen = true;
    },
  },
};
</script>

<style></style>
