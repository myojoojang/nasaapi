<template>
  <div class="pa-4">
    <h1 class="uppercase">
      NASA Image Library
    </h1>
    <p>Search NASA’s image and video library for Mars rover images and other NASA photographs.</p>
    <form
      class="image-search d-flex align-center flex-wrap"
      @submit.prevent="searchImages"
    >
      <v-text-field
        v-model="searchInput"
        label="Search NASA images"
        aria-label="Search NASA images"
        hide-details
        dense
        outlined
        color="primary"
        :disabled="isLoadingImages"
      />
      <v-btn
        type="submit"
        color="primary"
        class="black--text font-weight-bold ma-2"
        :disabled="isLoadingImages"
      >
        Search
      </v-btn>
    </form>
    <p
      v-if="searchValidationError"
      role="alert"
    >
      {{ searchValidationError }}
    </p>
    <div class="d-flex align-center flex-wrap my-4">
      <h3 class="uppercase ma-2">
        Mars rover searches
      </h3>
      <button
        v-for="rover in roverSearches"
        :key="rover"
        type="button"
        class="rover-option px-4 ma-1 font-weight-bold"
        :aria-pressed="searchTerms === rover"
        :class="{ 'primary black--text': searchTerms === rover }"
        :disabled="isLoadingImages"
        @click="selectRoverSearch(rover)"
      >
        {{ rover }}
      </button>
    </div>
    <p class="small-text">
      Results come from NASA’s general media library. Sol and camera filters are unavailable here.
      For mission raw images, browse
      <a
        href="https://mars.nasa.gov/msl/multimedia/raw-images/"
        target="_blank"
        rel="noopener noreferrer"
      >Curiosity</a> or
      <a
        href="https://mars.nasa.gov/mars2020/multimedia/raw-images/"
        target="_blank"
        rel="noopener noreferrer"
      >Perseverance</a>.
    </p>
    <v-progress-linear
      v-if="isLoadingImages"
      indeterminate
      aria-label="Loading NASA images"
    />
    <v-alert
      v-if="imagesLoadError"
      type="error"
      outlined
      role="alert"
      class="my-4"
    >
      {{ imagesLoadError }}
      <v-btn
        text
        :disabled="isLoadingImages"
        @click="loadImages"
      >
        Try again
      </v-btn>
    </v-alert>
    <template v-if="!imagesLoadError">
      <ImageSearchPagination
        :page="currentPage"
        :has-next-page="hasNextPage"
        :is-loading="isLoadingImages"
        @change-page="changePage"
      />
      <v-row class="mt-2">
        <LibraryImageCard
          v-for="image in images"
          :key="image.nasa_id"
          :image="image"
        />
        <v-card
          v-if="!images.length && !isLoadingImages"
          outlined
          height="400px"
          width="100%"
          class="text-center ma-4"
        >
          No images found
        </v-card>
      </v-row>
      <ImageSearchPagination
        :page="currentPage"
        :has-next-page="hasNextPage"
        :is-loading="isLoadingImages"
        @change-page="changePage"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { LibraryImage } from '@/types/nasa';
import { nasaApi } from '@/services/nasaApi';
import LibraryImageCard from '@/components/LibraryImageCard.vue';
import ImageSearchPagination from '@/components/ImageSearchPagination.vue';

const ROVER_SEARCHES = ['Curiosity rover', 'Perseverance rover', 'Opportunity rover', 'Spirit rover'];

interface ImageLibraryState {
  images: LibraryImage[];
  searchInput: string;
  searchTerms: string;
  currentPage: number;
  hasNextPage: boolean;
  isLoadingImages: boolean;
  imagesLoadError: string;
  searchValidationError: string;
}

export default defineComponent({
  name: 'ImageLibraryView',
  components: {
    LibraryImageCard,
    ImageSearchPagination,
  },
  data(): ImageLibraryState {
    return {
      images: [],
      searchInput: 'Mars rover',
      searchTerms: 'Mars rover',
      currentPage: 1,
      hasNextPage: false,
      isLoadingImages: false,
      imagesLoadError: '',
      searchValidationError: '',
    };
  },
  computed: {
    roverSearches(): string[] {
      return ROVER_SEARCHES;
    },
  },
  created() {
    this.loadImages();
  },
  methods: {
    async loadImages(): Promise<void> {
      this.isLoadingImages = true;
      this.imagesLoadError = '';
      this.images = [];
      this.hasNextPage = false;

      try {
        const result = await nasaApi.searchLibraryImages(this.searchTerms, this.currentPage);

        this.images = result.images;
        this.hasNextPage = result.hasNextPage;
      } catch {
        this.imagesLoadError = 'Couldn’t load NASA images. Please try again.';
      } finally {
        this.isLoadingImages = false;
      }
    },
    searchImages(): void {
      const searchTerms = this.searchInput.trim();

      if (!searchTerms) {
        this.searchValidationError = 'Enter a search term.';

        return;
      }

      this.searchValidationError = '';
      this.searchTerms = searchTerms;
      this.currentPage = 1;
      this.loadImages();
    },
    selectRoverSearch(rover: string): void {
      this.searchInput = rover;
      this.searchImages();
    },
    changePage(page: number): void {
      this.currentPage = page;
      this.loadImages();
    },
  },
});
</script>

<style scoped>
.image-search {
  max-width: 700px;
}
.rover-option {
  border: 1px solid #39ff14;
  color: #39ff14;
  min-height: 40px;
}
.rover-option:hover {
  font-weight: 700;
}
.rover-option:focus-visible {
  outline: 2px solid #39ff14;
}
</style>
