<script setup lang="ts">
import { computed, inject, ref, watchEffect } from 'vue';
import type {
  Event,
  Target,
  CommentType,
  Profile,
  CommentTarget,
  WithHasProfile,
  WithID,
} from '@collabkit/core';
import Avatar from './Avatar';
import MessageHeader from './comment/MessageHeader.vue';
import { HStack } from './UIKit';
import {
  StyledCommentContainer,
  StyledCommentMessage,
  StyledCommentBody,
  StyledCommentBodyEllipsis,
} from './comment/StyledComment';
import { useIntersectionObserver, useWindowFocus } from '@vueuse/core';
import { useEvents } from '../composables/useEvents';
import { TargetKey } from '../constants';
import Markdown from './Markdown.vue';

const props = defineProps<{
  reactions: { [createdById: string]: Event };
  seen?: boolean;
  event: WithID<WithHasProfile<Event>>;
  profile: Profile;
  type: CommentType;
  isPreview?: boolean;
}>();

const showProfile = computed(() => props.type === 'default' || props.type === 'inline-start');

const events = useEvents();
const isWindowFocused = useWindowFocus();
const target = inject<Target>(TargetKey);
const container = ref(null);
const inView = ref(false);
useIntersectionObserver(
  container,
  ([{ isIntersecting }]) => {
    inView.value = isIntersecting;
  },
  {
    threshold: 0,
  }
);
watchEffect(() => {
  const shouldMarkSeen = isWindowFocused.value && inView.value;
  if (shouldMarkSeen) {
    events.onSeen({ target: target as CommentTarget });
  }
});

const isOverflowing = false;
</script>

<template>
  <StyledCommentContainer
    ref="container"
    :seen="seen"
    :type="props.type ?? 'default'"
    :isPreview="isPreview"
  >
    <Avatar v-if="showProfile" :profile="profile" />
    <HStack>
      <StyledCommentMessage :profileIndent="!showProfile">
        <MessageHeader
          v-if="showProfile"
          :name="profile.name ?? profile.email ?? 'Anonymous'"
          :createdAt="+props.event.createdAt"
        />
        <StyledCommentBody :isPreview="isPreview">
          <Markdown :body="props.event.body" />
          <StyledCommentBodyEllipsis v-if="isOverflowing">...</StyledCommentBodyEllipsis>
        </StyledCommentBody>
      </StyledCommentMessage>
    </HStack>
  </StyledCommentContainer>
</template>
