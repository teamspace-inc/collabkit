<script setup lang="ts">
import { formatRelative } from 'date-fns';
import { messageHeaderStyles } from '@collabkit/theme';
import { computed } from 'vue';
import { styled } from '../styled';

const Root = styled('div', messageHeaderStyles.root);
const Name = styled('div', messageHeaderStyles.name);
const Timestamp = styled('span', messageHeaderStyles.timestamp);

const props = defineProps<{ name: string; createdAt: number }>();

const timestamp = computed(() =>
  formatRelative(props.createdAt, +Date.now())
    .replace(/yesterday at (.*)/, 'yesterday')
    .replace('today at', '')
    .replace(/(last Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday) .*/, '$1')
);
</script>

<template>
  <Root>
    <Name>
      {{ name }}{{ ' ' }}
      <Timestamp>
        {{ timestamp }}
      </Timestamp>
    </Name>
  </Root>
</template>
