<template>
  <v-card outlined>
    <div class="d-flex justify-end align-center">
      <div class="pointer ma-2" @click="$emit('detail-dlg-close')">x</div>
    </div>

    <v-card-text class="pa-8 primary--text">
      <template v-if="data.img_src">
        <v-img :src="data.img_src" />
      </template>
      <div class="mt-2" v-for="(val, key) in data" :key="key">
        <span class="uppercase font-weight-bold"> {{ key }} </span>
        <template v-if="typeof val === 'object'">
          <div class="mx-4" v-for="(val, key) in val" :key="key">
            {{ key }} | {{ val }}
          </div>
        </template>
        <template v-else> | {{ val }} </template>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "DetailDlg",
  props: {
    data: { type: Object, default: null },
  },
};
</script>

<style></style>
