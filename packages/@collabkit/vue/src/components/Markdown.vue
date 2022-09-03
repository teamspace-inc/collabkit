<script setup lang="ts">
import { computed } from 'vue';
import remarkHtml from 'remark-html';
import remarkParse from 'remark-parse';
import { unified } from 'unified';

const props = defineProps<{
  body: string;
}>();

const html = computed(() =>
  unified().use(remarkParse).use(remarkHtml).processSync(props.body).toString()
);
</script>

<template>
  <span v-html="html"></span>
</template>
