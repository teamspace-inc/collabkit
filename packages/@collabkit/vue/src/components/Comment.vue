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
import { commentStyles } from '@collabkit/theme';
import { styled } from './styled';
import { seen } from '../../../client/src/actions/seen';

import { useIntersectionObserver, useWindowFocus } from '@vueuse/core';
import { useEvents } from '../composables/useEvents';
import { TargetKey } from '../constants';
import Markdown from './Markdown.vue';

const Root = styled('div', commentStyles.root);
const Message = styled('div', commentStyles.message);
const Body = styled('span', commentStyles.body);
const BodyEllipsis = styled('span', commentStyles.bodyEllipsis);

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
  <Root ref="container" :seen="seen" :type="props.type ?? 'default'" :isPreview="isPreview">
    <Avatar v-if="showProfile" :profile="profile" />
    <HStack>
      <Message :profileIndent="!showProfile">
        <MessageHeader
          v-if="showProfile"
          :name="profile.name ?? profile.email ?? 'Anonymous'"
          :createdAt="+props.event.createdAt"
        />
        <Body :isPreview="isPreview">
          <Markdown :body="props.event.body" />
          <BodyEllipsis v-if="isOverflowing">...</BodyEllipsis>
        </Body>
      </Message>
    </HStack>
  </Root>
</template>
