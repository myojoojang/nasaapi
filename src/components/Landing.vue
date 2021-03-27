<template>
  <div><img :src="data.url" />{{ data.url }}</div>
</template>

<script>
import { API_KEY, API_PREFIX } from "@/GlobalVars";
import axios from "axios";
export default {
  name: "Landing",
  data: () => ({
    data: "",
  }),
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

<style>
</style>