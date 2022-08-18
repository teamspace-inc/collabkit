<script setup lang="ts">
import { computed, watch } from 'vue';
import type { CommentType, Profile, Target as TargetType } from '@collabkit/core';
import Avatar from './Avatar.vue';
import MessageHeader from './comment/MessageHeader.vue';
import { HStack } from './UIKit';
// import { TargetKey } from '../constants';
import {
  StyledCommentContainer,
  StyledCommentMessage,
  StyledCommentBody,
  StyledCommentBodyEllipsis,
} from './comment/StyledComment';

const props = defineProps<{
  id: string;
  reactions: { [createdById: string]: Event };
  timestamp: number | object;
  body: string;
  event: Event;
  profile: Profile;
  type: CommentType;
  isPreview?: boolean;
}>();

// const target = inject(TargetKey);

const showProfile = computed(() => props.type === 'default' || props.type === 'inline-start');

const isOverflowing = false;
</script>

<template>
  <StyledCommentContainer :isPreview="isPreview">
    <Avatar v-if="showProfile" :profile="profile" />
    <HStack>
      <StyledCommentMessage :profileIndent="!showProfile">
        <MessageHeader
          v-if="showProfile"
          :name="profile.name ?? profile.email ?? 'Anonymous'"
          :createdAt="+timestamp"
        />
        <StyledCommentBody :isPreview="isPreview">
          {{ body }}
          <StyledCommentBodyEllipsis v-if="isOverflowing">...</StyledCommentBodyEllipsis>
        </StyledCommentBody>
      </StyledCommentMessage>
    </HStack>
  </StyledCommentContainer>
</template>
