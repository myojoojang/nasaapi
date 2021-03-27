<template>
  <div>
    <div class="d-flex justify-space-between align-center mx-4">
      <h1>APOD: Astronomy Picture of the Day</h1>
      <!-- 
    <div class="textover">
      <div v-for="(val, key) in data" :key="key">{{ key }}: {{ val }}</div>
    </div> -->
      <h1 class="pointer" @click="isDetailDlgOpen = true">+</h1>
    </div>
    <v-img
      class="pointer"
      @click="isDetailDlgOpen = true"
      :src="data.url"
      aspect-ratio="2"
    />
    <v-dialog
      scrollable
      persistent
      width="50vw"
      max-width="800px"
      v-model="isDetailDlgOpen"
    >
      <detail-dlg
        v-if="isDetailDlgOpen"
        :data="data"
        @detail-dlg-close="isDetailDlgOpen = false"
      />
    </v-dialog>
  </div>
</template>

<script>
import DetailDlg from "./DetailDlg";
import { API_KEY, API_PREFIX } from "@/GlobalVars";
import axios from "axios";
export default {
  name: "Landing",
  data: () => ({
    data: "",
    isDetailDlgOpen: false,
  }),
  components: {
    DetailDlg,
  },
  beforeMount() {
    this.getData();
  },
  methods: {
    getData() {
      axios({
        method: "get",
        url: `${API_PREFIX}/planetary/apod?api_key=${API_KEY}`,
      })
        .then((res) => {
          this.data = res.data;
          console.log(res);
        })
        .catch((err) => console.error(err));
    },
  },
};
</script>
