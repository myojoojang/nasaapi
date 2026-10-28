<template>
  <div class="pa-4">
    <header class="library-heading">
      <h1 class="uppercase">
        NASA Image Library
      </h1>
      <p>Search NASA’s collection of Mars rover images and other photographs.</p>
    </header>
    <section
      class="search-panel"
      aria-label="Search NASA images"
    >
      <form
        class="image-search"
        @submit.prevent="searchImages"
      >
        <div class="search-field">
          <label
            for="nasa-image-search"
            class="field-label"
          >Search images</label>
          <input
            id="nasa-image-search"
            v-model="searchInput"
            type="search"
            class="search-input"
            placeholder="e.g. Curiosity rover"
            :disabled="isLoadingImages"
          >
        </div>
        <v-btn
          type="submit"
          color="primary"
          class="search-button black--text font-weight-bold"
          height="44"
          min-width="120"
          :disabled="isLoadingImages"
        >
          Search
        </v-btn>
      </form>
      <p
        v-if="searchValidationError"
        class="search-error"
        role="alert"
      >
        {{ searchValidationError }}
      </p>
      <div class="preset-searches">
        <span class="field-label">Quick searches</span>
        <div class="preset-buttons">
          <button
            v-for="rover in roverSearches"
            :key="rover"
            type="button"
            class="rover-option"
            :aria-pressed="searchTerms === rover"
            :class="{ 'rover-option--active': searchTerms === rover }"
            :disabled="isLoadingImages"
            @click="selectRoverSearch(rover)"
          >
            {{ rover }}
          </button>
        </div>
      </div>
    </section>

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
      <ImageLibraryPagination
        v-if="hasNextPage || currentPage > 1"
        :page="currentPage"
        :has-next-page="hasNextPage"
        :is-loading="isLoadingImages"
        @change-page="changePage"
      />
      <v-row class="mt-2">
        <ImageLibraryCard
          v-for="image in images"
          :key="image.nasa_id"
          :image="image"
        />
        <v-col
          v-if="!images.length && !isLoadingImages"
          cols="12"
        >
          <v-card
            outlined
            class="pa-8 text-center"
          >
            No images found for “{{ searchTerms }}”. Try another search.
          </v-card>
        </v-col>
      </v-row>
      <ImageLibraryPagination
        v-if="hasNextPage || currentPage > 1"
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
import ImageLibraryCard from '@/components/ImageLibraryCard.vue';
import ImageLibraryPagination from '@/components/ImageLibraryPagination.vue';

const ROVER_SEARCHES = [
  'Curiosity rover',
  'Perseverance rover',
  'Opportunity rover',
  'Spirit rover',
];

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
    ImageLibraryCard,
    ImageLibraryPagination,
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
        const result = await nasaApi.searchLibraryImages(
          this.searchTerms,
          this.currentPage,
        );

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
.library-heading, .search-panel {
  max-width: 960px;
}
.library-heading {
  margin-bottom: 24px;
}
.library-heading h1 {
  margin-bottom: 8px;
}
.library-heading p {
  color: #c1d7bc;
  line-height: 1.5;
}
.search-panel {
  background: #1b1b1b;
  border: 1px solid #426a3c;
  padding: 20px;
}
.image-search {
  align-items: end;
  display: grid;
  gap: 12px;
  grid-template-columns: minmax(0, 1fr) auto;
}
.search-field {
  min-width: 0;
}
.field-label {
  color: #c1d7bc;
  display: block;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  margin-bottom: 8px;
  text-transform: uppercase;
}
.search-input {
  background: #121212;
  border: 1px solid #738a70;
  border-radius: 0;
  color: #fff;
  font-size: 1rem;
  height: 44px;
  padding: 0 14px;
  width: 100%;
}
.search-input:focus-visible {
  border-color: #39ff14;
  outline: 2px solid #39ff14;
  outline-offset: 2px;
}
.search-input:disabled, .rover-option:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
.search-error {
  color: #ff8a80;
  margin-top: 10px;
}
.preset-searches {
  margin-top: 20px;
}
.preset-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.rover-option {
  background: transparent;
  border: 1px solid #738a70;
  color: #39ff14;
  font-size: 0.9rem;
  font-weight: 700;
  min-height: 40px;
  padding: 8px 14px;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}
.rover-option:hover, .rover-option:focus-visible {
  background: #294125;
  border-color: #39ff14;
}
.rover-option--active, .rover-option--active:hover {
  background: #39ff14;
  border-color: #39ff14;
  color: #111;
}
.rover-option:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 2px;
}
@media (max-width: 600px) {
  .search-panel {
    padding: 16px;
  }
  .image-search {
    grid-template-columns: 1fr;
  }
  .search-button {
    width: 100%;
  }
}
</style>
