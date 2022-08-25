<script setup lang="ts">
import { newIndicatorStyles } from '@collabkit/theme';
import { styled } from './styled';

const StyledNewIndicatorTextInlay = styled('span', newIndicatorStyles.textInlay);
const StyledNewIndicator = styled('div', newIndicatorStyles.indicator);
const StyledNewIndicatorLine = styled('div', newIndicatorStyles.line);
</script>

<template>
  <StyledNewIndicator>
    <StyledNewIndicatorTextInlay>New</StyledNewIndicatorTextInlay>
    <StyledNewIndicatorLine />
  </StyledNewIndicator>
</template>
