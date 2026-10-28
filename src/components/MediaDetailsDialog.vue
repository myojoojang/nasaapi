<template>
  <v-card
    outlined
    class="details-card"
  >
    <header class="details-header">
      <h2>{{ title }}</h2>
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
    </header>
    <v-card-text class="details-content">
      <v-img
        v-if="imageUrl"
        :src="imageUrl"
        :alt="title"
        aspect-ratio="2"
        class="mb-4"
      />
      <dl>
        <div
          v-for="field in metadataFields"
          :key="field.name"
          class="detail-row"
        >
          <dt>{{ field.name }}</dt>
          <dd>{{ field.value }}</dd>
        </div>
      </dl>
      <v-btn
        v-if="sourceUrl"
        outlined
        color="primary"
        :href="sourceUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="mt-4"
      >
        Open on NASA
      </v-btn>
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
      const hiddenFields = new Set([
        'basic_html',
        'title',
        'url',
        'hdurl',
        'permalink',
        'media_type',
      ]);

      return Object.entries(this.metadata).filter(([name, value]) => {
        return !hiddenFields.has(name) && value !== null && value !== undefined && value !== '';
      }).map(([name, value]) => {
        const displayValue = typeof value === 'string' ? plainTextFromHtml(value) : String(value);

        return {
          name: name.replaceAll('_', ' '),
          value: displayValue,
        };
      });
    },
  },
});
</script>

<style scoped>
.details-card {
  background: var(--nasa-surface);
}
.details-header {
  align-items: center;
  border-bottom: 1px solid var(--nasa-border);
  display: flex;
  gap: 16px;
  justify-content: space-between;
  padding: 8px 16px 8px 24px;
}
.details-header h2 {
  color: var(--nasa-accent);
  font-size: 1.35rem;
  line-height: 1.3;
  margin: 0;
  overflow-wrap: anywhere;
}
.close-icon {
  font-size: 2.25rem;
  line-height: 1;
}
.details-content {
  padding: 24px;
}
.detail-row {
  border-bottom: 1px solid var(--nasa-border);
  display: grid;
  gap: 16px;
  grid-template-columns: minmax(110px, 150px) minmax(0, 1fr);
  padding: 12px 0;
}
.detail-row dt {
  color: var(--nasa-accent);
  font-weight: 700;
  text-transform: uppercase;
}
.detail-row dd {
  color: var(--nasa-muted);
  margin: 0;
  overflow-wrap: anywhere;
}
@media (max-width: 600px) {
  .detail-row {
    gap: 4px;
    grid-template-columns: 1fr;
  }
}
</style>
