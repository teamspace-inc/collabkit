<script setup lang="ts">
import {
  CommentActions,
  CommentBody,
  CommentCreatorAvatar,
  CommentCreatorName,
  CommentEditor,
  CommentHeader,
  CommentIndent,
  CommentMoreMenu,
  CommentNameAndTimestampWrapper,
  CommentRoot,
  CommentTimestamp,
} from './';
import { ThreadResolveIconButton } from '../Thread';

const props = defineProps<{
  commentId: string;
  hideProfile?: boolean;
  showResolveThreadButton?: boolean;
}>();
</script>

<template>
  <CommentRoot :commentId="commentId">
    <CommentHeader>
      <CommentCreatorAvatar v-if="!hideProfile" />
      <CommentNameAndTimestampWrapper v-if="!hideProfile">
        <CommentCreatorName />
        <CommentTimestamp />
      </CommentNameAndTimestampWrapper>
      )}
      <CommentActions>
        <ThreadResolveIconButton v-if="showResolveThreadButton" />
        <CommentMoreMenu />
      </CommentActions>
    </CommentHeader>
    <CommentIndent>
      <CommentBody />
    </CommentIndent>
    <CommentEditor />
  </CommentRoot>
</template>
