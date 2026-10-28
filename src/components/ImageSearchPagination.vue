<template>
  <div class="d-flex justify-end my-4">
    <v-btn
      outlined
      width="100px"
      color="primary"
      :disabled="isLoading || page <= 1"
      @click="$emit('change-page', page - 1)"
    >
      Previous
    </v-btn>
    <v-btn
      outlined
      width="100px"
      color="primary"
      :disabled="isLoading || !hasNextPage"
      @click="$emit('change-page', page + 1)"
    >
      Next
    </v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ImageSearchPagination',
  props: {
    page: {
      type: Number,
      required: true,
    },
    hasNextPage: {
      type: Boolean,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
});
</script>
