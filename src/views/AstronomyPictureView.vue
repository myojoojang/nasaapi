<template>
  <div class="page-view">
    <header class="page-heading">
      <h1>APOD: Astronomy Picture of the Day</h1>
      <p>
        {{ astronomyPicture ? astronomyPicture.date : today }} · NASA’s daily view of the universe.
      </p>
    </header>
    <v-alert
      v-if="pictureLoadError"
      type="error"
      outlined
      role="alert"
      class="mb-4"
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
      <v-card
        outlined
        class="apod-panel"
      >
        <div class="apod-panel-header">
          <h2>{{ pictureTitle }}</h2>
          <v-btn
            outlined
            color="primary"
            aria-label="View astronomy picture details"
            @click="isDetailsOpen = true"
          >
            View details
          </v-btn>
        </div>
        <v-img
          v-if="pictureImageUrl"
          class="pointer"
          :src="pictureImageUrl"
          :alt="pictureTitle"
          aspect-ratio="2"
          @click="isDetailsOpen = true"
        />
        <p
          v-if="astronomyPicture.media_type !== 'image'"
          class="apod-video-note"
        >
          Open details to watch this video on NASA.
        </p>
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
          :metadata="astronomyPicture"
          :title="pictureTitle"
          :image-url="pictureImageUrl"
          :source-url="pictureSourceUrl"
          @close="isDetailsOpen = false"
        />
      </v-dialog>
    </template>
    <div
      v-else-if="!isLoadingPicture && !pictureLoadError"
      class="empty-state"
    >
      No astronomy picture available.
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { AstronomyPicture } from '@/types/nasa';
import { nasaApi } from '@/services/nasaApi';
import {
  getAstronomyImageUrl,
  safeMediaUrl,
  plainTextFromHtml,
} from '@/utils/media';
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
      return safeMediaUrl(
        this.astronomyPicture?.permalink || this.astronomyPicture?.url,
      );
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

<style scoped>
.apod-panel {
  overflow: hidden;
}
.apod-panel-header {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  padding: 20px;
}
.apod-panel-header h2 {
  font-size: 1.3rem;
  line-height: 1.3;
  margin: 0;
  overflow-wrap: anywhere;
}
.apod-video-note {
  color: var(--nasa-muted);
  padding: 20px;
}
</style>
