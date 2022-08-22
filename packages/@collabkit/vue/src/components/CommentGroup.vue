<script setup lang="ts">
import { computed } from 'vue';
import type { Event, CommentType, Profile, WithID } from '@collabkit/core';
import Comment from './Comment.vue';
import Target from './Target.vue';
import { useStore } from '../composables/useStore';

const props = defineProps<{
  group: WithID<Event>[];
  reactions: { [parentId: string]: { [createdById: string]: Event } };
  workspaceId: string;
  threadId: string;
  isPreview?: boolean;
}>();

const store = useStore();

const comments = computed(() => (props.isPreview ? props.group.slice(0, 1) : props.group));

function getCommentType(group: Event[], index: number): CommentType {
  let type: CommentType = 'default';

  if (group.length > 1) {
    type = 'inline';

    if (index === 0) {
      type = 'inline-start';
    }

    if (index === group.length - 1) {
      type = 'inline-end';
    }
  }

  return type;
}
</script>

<template>
  <Target
    v-for="(event, index) in comments"
    :target="{ type: 'comment', eventId: event.id, workspaceId, threadId }"
  >
    <Comment
      v-if="store.profiles[event.createdById]"
      :id="event.id"
      :event="event"
      :reactions="reactions[event.id] ?? {}"
      :type="getCommentType(group, index)"
      :timestamp="event.createdAt"
      :key="`event-${event.id}`"
      :body="event.body"
      :profile="store.profiles[event.createdById]"
      :isPreview="isPreview"
    />
  </Target>
</template>
