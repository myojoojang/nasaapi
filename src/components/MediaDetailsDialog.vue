<template>
  <v-card outlined>
    <div class="d-flex justify-end align-center">
      <v-btn
        text
        color="primary"
        aria-label="Close details"
        min-width="56"
        height="56"
        @click="$emit('close')"
      >
        <span
          class="close-icon"
          aria-hidden="true"
        >×</span>
      </v-btn>
    </div>
    <v-card-text class="pa-8 primary--text">
      <v-img
        v-if="imageUrl"
        :src="imageUrl"
        :alt="title"
        aspect-ratio="2"
      />
      <h2>{{ title }}</h2>
      <div
        v-for="field in metadataFields"
        :key="field.name"
        class="mt-2"
      >
        <span class="uppercase font-weight-bold">{{ field.name }}</span>
        <span class="metadata-value"> | {{ field.value }}</span>
      </div>
      <a
        v-if="sourceUrl"
        :href="sourceUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open on NASA
      </a>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { AstronomyPicture } from '@/types/nasa';
import { plainTextFromHtml } from '@/utils/media';

export default defineComponent({
  name: 'MediaDetailsDialog',
  props: {
    metadata: {
      type: Object as PropType<AstronomyPicture | Record<string, string>>,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: '',
    },
    sourceUrl: {
      type: String,
      default: '',
    },
  },
  computed: {
    metadataFields(): { name: string; value: string }[] {
      return Object.entries(this.metadata).filter(([name]) => {
        return name !== 'basic_html';
      }).map(([name, value]) => {
        let displayValue = String(value ?? 'N/D');

        if (typeof value === 'object' && value !== null) {
          displayValue = JSON.stringify(value);
        }

        if (['explanation', 'copyright', 'credit', 'title', 'alt', 'Description'].includes(name)) {
          displayValue = plainTextFromHtml(displayValue);
        }

        return {
          name,
          value: displayValue,
        };
      });
    },
  },
});
</script>

<style scoped>
.close-icon {
  font-size: 2.25rem;
  line-height: 1;
}
.metadata-value {
  overflow-wrap: anywhere;
}
</style>
