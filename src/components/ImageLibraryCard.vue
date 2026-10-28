<template>
  <v-col
    cols="12"
    md="4"
  >
    <v-card
      outlined
      height="100%"
      class="my-2 d-flex flex-column"
    >
      <v-card-text class="flex-grow-1">
        <v-img
          :src="imageUrl"
          :alt="image.title"
          aspect-ratio="1.7"
        />
        <div class="primary--text mt-4">
          <h4>{{ image.title }}</h4>
          <p class="ma-0">
            {{ image.center || 'NASA' }} · {{ imageDate }}
          </p>
        </div>
      </v-card-text>
      <div class="d-flex justify-end pa-4">
        <v-btn
          outlined
          color="primary"
          :aria-label="`View details for ${image.title}`"
          @click="isDetailsOpen = true"
        >
          View details
        </v-btn>
      </div>
    </v-card>
    <v-dialog
      v-model="isDetailsOpen"
      scrollable
      persistent
      width="80vw"
      max-width="800px"
    >
      <MediaDetailsDialog
        v-if="isDetailsOpen"
        :metadata="imageMetadata"
        :title="image.title"
        :image-url="imageUrl"
        :source-url="sourceUrl"
        @close="isDetailsOpen = false"
      />
    </v-dialog>
  </v-col>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { LibraryImage } from '@/types/nasa';
import { safeMediaUrl } from '@/utils/media';
import MediaDetailsDialog from '@/components/MediaDetailsDialog.vue';

export default defineComponent({
  name: 'ImageLibraryCard',
  components: { MediaDetailsDialog },
  props: {
    image: {
      type: Object as PropType<LibraryImage>,
      required: true,
    },
  },
  data() {
    return { isDetailsOpen: false };
  },
  computed: {
    imageUrl(): string {
      return safeMediaUrl(this.image.previewUrl);
    },
    imageDate(): string {
      return this.image.date_created?.slice(0, 10) ?? 'Date unavailable';
    },
    sourceUrl(): string {
      return `https://images.nasa.gov/details/${encodeURIComponent(this.image.nasa_id)}`;
    },
    imageMetadata(): Record<string, string> {
      return {
        'NASA ID': this.image.nasa_id,
        'Date created': this.imageDate,
        Center: this.image.center ?? 'NASA',
        Description: this.image.description ?? 'No description available.',
      };
    },
  },
});
</script>
