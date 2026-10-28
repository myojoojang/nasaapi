<template>
  <div>
    <div class="d-flex justify-space-between align-center mx-4">
      <h1>
        APOD: Astronomy Picture of the Day :
        {{ astronomyPicture ? astronomyPicture.date : today }}
      </h1>
      <v-btn
        v-if="astronomyPicture"
        text
        color="primary"
        aria-label="Open picture details"
        @click="isDetailsOpen = true"
      >
        +
      </v-btn>
    </div>
    <v-progress-linear
      v-if="isLoadingPicture"
      indeterminate
      aria-label="Loading astronomy picture"
    />
    <v-alert
      v-if="pictureLoadError"
      type="error"
      outlined
      role="alert"
      class="ma-4"
    >
      {{ pictureLoadError }}
      <v-btn
        text
        :disabled="isLoadingPicture"
        @click="loadAstronomyPicture"
      >
        Try again
      </v-btn>
    </v-alert>
    <template v-if="astronomyPicture">
      <v-img
        v-if="pictureImageUrl"
        class="pointer"
        :src="pictureImageUrl"
        :alt="pictureTitle"
        aspect-ratio="2"
        @click="isDetailsOpen = true"
      />
      <div
        v-if="astronomyPicture.media_type !== 'image'"
        class="pa-4"
      >
        <p>{{ pictureTitle }}</p>
        <v-btn
          v-if="pictureSourceUrl"
          outlined
          color="primary"
          :href="pictureSourceUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          Watch on NASA
        </v-btn>
      </div>
      <v-dialog
        v-model="isDetailsOpen"
        scrollable
        persistent
        width="80vw"
        max-width="800px"
      >
        <MediaDetailsDialog
          v-if="isDetailsOpen"
          :metadata="astronomyPicture"
          :title="pictureTitle"
          :image-url="pictureImageUrl"
          :source-url="pictureSourceUrl"
          @close="isDetailsOpen = false"
        />
      </v-dialog>
    </template>
    <p
      v-else-if="!isLoadingPicture && !pictureLoadError"
      class="pa-4"
    >
      No astronomy picture available.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { AstronomyPicture } from '@/types/nasa';
import { nasaApi } from '@/services/nasaApi';
import { getAstronomyImageUrl, safeMediaUrl, plainTextFromHtml } from '@/utils/media';
import MediaDetailsDialog from '@/components/MediaDetailsDialog.vue';

interface AstronomyState {
  astronomyPicture: AstronomyPicture | null;
  isLoadingPicture: boolean;
  pictureLoadError: string;
  isDetailsOpen: boolean;
  today: string;
}

export default defineComponent({
  name: 'AstronomyPictureView',
  components: { MediaDetailsDialog },
  data(): AstronomyState {
    return {
      astronomyPicture: null,
      isLoadingPicture: false,
      pictureLoadError: '',
      isDetailsOpen: false,
      today: new Date().toLocaleDateString(),
    };
  },
  computed: {
    pictureTitle(): string {
      return plainTextFromHtml(this.astronomyPicture?.title ?? '');
    },
    pictureImageUrl(): string {
      if (!this.astronomyPicture) {
        return '';
      }

      return getAstronomyImageUrl(this.astronomyPicture);
    },
    pictureSourceUrl(): string {
      return safeMediaUrl(this.astronomyPicture?.permalink || this.astronomyPicture?.url);
    },
  },
  created() {
    this.loadAstronomyPicture();
  },
  methods: {
    async loadAstronomyPicture(): Promise<void> {
      this.isLoadingPicture = true;
      this.pictureLoadError = '';

      try {
        this.astronomyPicture = await nasaApi.fetchAstronomyPicture();
      } catch {
        this.pictureLoadError = 'Couldn’t load the astronomy picture. Please try again.';
      } finally {
        this.isLoadingPicture = false;
      }
    },
  },
});
</script>
