<script setup lang="ts">
import type { Workspace } from '@collabkit/core';
import { threadStyles } from '@collabkit/theme';
import Composer from './Composer.vue';
import EmptyState from './thread/EmptyState.vue';
import ScrollableCommentList from './ScrollableCommentList.vue';
import { styled } from './styled';

const StyledThreadContainer = styled('div', threadStyles.container);
const StyledThread = styled('div', threadStyles.thread);
const StyledThreadHeader = styled('div', threadStyles.header);
const StyledThreadHeaderTitle = styled('div', threadStyles.headerTitle);

const props = defineProps<{
  threadId: string;
  info?: {
    name?: string;
    url?: string;
  };
  composerPrompt?: string;
  showHeader?: boolean;
  onCloseButtonClick?: (e: React.MouseEvent) => void;
}>();

const workspaceId = 'acme';
const workspace: Workspace = {
  profiles: {},
  name: 'ACME',
  pins: {},
  inbox: {},
  timeline: {},
  composers: {},
  seen: {},
  seenBy: {},
  threadInfo: {},
};

const timeline = {
  '-N9Xt_91-pO_ZGGB6rUt': {
    body: 'Hello',
    createdAt: 1660590379668,
    createdById: '118153377351485973303',
    type: 'message',
  },
  '-N9Xt_qUB8QBrC2QGtw7': {
    body: 'This works',
    createdAt: 1660590382533,
    createdById: '105986699029334209805',
    type: 'message',
  },
  '-N9XwUGKg5ueBiolnOpS': {
    body: 'Hello',
    createdAt: 1660591142005,
    createdById: '105986699029334209805',
    type: 'message',
  },
  '-N9Xx5i8jaB7D5qX93KT': {
    body: 'Hello again :)',
    createdAt: 1660591303581,
    createdById: '105986699029334209805',
    type: 'message',
  },
  '-N9Xz_1w3HpTMwuv8w3Q': {
    body: 'And yes',
    createdAt: 1660591952084,
    createdById: '105986699029334209805',
    type: 'message',
  },
  '-N9Y0g-Yxn5wt01aCebt': {
    body: 'Fellas',
    createdAt: 1660592504983,
    createdById: '118153377351485973303',
    type: 'message',
  },
  '-N9Y2n69L_YcweQT0tK0': {
    body: 'Funky!',
    createdAt: 1660593058263,
    createdById: '105986699029334209805',
    type: 'message',
  },
  '-N9_woK85yyoaRwwKhW7': {
    body: 'Hey there',
    createdAt: 1660641559901,
    createdById: '105986699029334209805',
    type: 'message',
  },
  '-N9_wp_IXuLvB8J0Mtxv': {
    body: 'And this works',
    createdAt: 1660641565057,
    createdById: '118153377351485973303',
    type: 'message',
  },
  '-N9_xM53vrgvAPjQE2rw': {
    body: 'This works',
    createdAt: 1660641702299,
    createdById: '105986699029334209805',
    type: 'message',
  },
  '-N9_xk6FTSwJem_aMPVB': {
    body: 'Oh my god',
    createdAt: 1660641804863,
    createdById: '105986699029334209805',
    type: 'message',
  },
  '-N9_y6OJ44mWFflm556b': {
    body: 'Hello',
    createdAt: 1660641900136,
    createdById: '105986699029334209805',
    type: 'message',
  },
  '-N9_y6buCJig9gbn6lb9': {
    body: 'World',
    createdAt: 1660641901070,
    createdById: '105986699029334209805',
    type: 'message',
  },
  '-N9_y78m9oRI_d1QNNOW': {
    body: 'This works well',
    createdAt: 1660641903248,
    createdById: '105986699029334209805',
    type: 'message',
  },
  '-N9_y7_cvdpLs_kqf6BW': {
    body: 'Another one here',
    createdAt: 1660641905129,
    createdById: '105986699029334209805',
    type: 'message',
  },
  '-N9_y89ycOEcw4OoE64p': {
    body: 'You can write more',
    createdAt: 1660641907412,
    createdById: '105986699029334209805',
    type: 'message',
  },
  '-N9_y9ZxGOVRbybJllu0': {
    body: 'Typing indicator bumps content around',
    createdAt: 1660641913168,
    createdById: '105986699029334209805',
    type: 'message',
  },
  '-N9_yARVI8AbzVImF7jb': {
    body: 'We can make this nicer',
    createdAt: 1660641916725,
    createdById: '105986699029334209805',
    type: 'message',
  },
  '-N9_yWSJy6BW-LyUt-Wx': {
    body: "Another one here, and you'll love it",
    createdAt: 1660642006887,
    createdById: '118153377351485973303',
    type: 'message',
  },
  '-N9_yXDQdJM6H8GmnaYL': {
    body: 'Test',
    createdAt: 1660642010030,
    createdById: '118153377351485973303',
    type: 'message',
  },
  '-N9_yXkpVo6IdtD4BqFy': {
    body: 'Yo yo yo',
    createdAt: 1660642012234,
    createdById: '118153377351485973303',
    type: 'message',
  },
  '-N9_zPidLtKtiD7zeUj-': {
    body: 'yo',
    createdAt: 1660642241483,
    createdById: '118153377351485973303',
    type: 'message',
  },
  '-N9_zVMwsrPY2ykGXNcz': {
    body: 'yo',
    createdAt: 1660642264591,
    createdById: '118153377351485973303',
    type: 'message',
  },
  '-N9_zVmfH8TWrVp6Ihzf': {
    body: 'This works',
    createdAt: 1660642266424,
    createdById: '118153377351485973303',
    type: 'message',
  },
  '-N9_z_EzrIQlNLpcKzIh': {
    body: 'Yo',
    createdAt: 1660642284565,
    createdById: '105986699029334209805',
    type: 'message',
  },
  '-N9_zaKJlsfQfgK-YCDl': {
    body: 'And this is now using focus',
    createdAt: 1660642288999,
    createdById: '105986699029334209805',
    type: 'message',
  },
  '-N9_zc233TpQNc9AYqJA': {
    body: 'To figure out if something is read/unread',
    createdAt: 1660642296024,
    createdById: '105986699029334209805',
    type: 'message',
  },
  '-N9a-P9MHlfZPvIeFj0F': {
    body: 'And',
    createdAt: 1660642501290,
    createdById: '105986699029334209805',
    type: 'message',
  },
  '-N9a-PZN82f3cwayQFBQ': {
    body: 'This is now',
    createdAt: 1660642502960,
    createdById: '105986699029334209805',
    type: 'message',
  },
  '-N9a-PnVpmzD9BD7Kl7R': {
    body: 'working',
    createdAt: 1660642503935,
    createdById: '105986699029334209805',
    type: 'message',
  },
  '-N9a-Q09w8PjFDNg4iNc': {
    body: 'properly',
    createdAt: 1660642504941,
    createdById: '105986699029334209805',
    type: 'message',
  },
  '-N9a-QVAdqJLIQQIHgwA': {
    body: 'with window focus',
    createdAt: 1660642506783,
    createdById: '105986699029334209805',
    type: 'message',
  },
  '-N9a5iqRnMu1krYK-8gQ': {
    body: 'a new message',
    createdAt: 1660644158926,
    createdById: '118153377351485973303',
    type: 'message',
  },
  '-N9a60WSSVC5_d8DmHwb': {
    body: 'and another one',
    createdAt: 1660644235411,
    createdById: '118153377351485973303',
    type: 'message',
  },
  '-N9aKFo9B5wvgthQ9nmw': {
    body: 'work this out',
    createdAt: 1660647968451,
    createdById: '118153377351485973303',
    type: 'message',
  },
  '-N9aLAzYSOYHpjnF1Ydz': {
    body: '123123',
    createdAt: 1660648210460,
    createdById: '118153377351485973303',
    type: 'message',
  },
  '-N9aUWZWsT3N_rdTXWzs': {
    body: 'Test',
    createdAt: 1660650658112,
    createdById: '118153377351485973303',
    type: 'message',
  },
  '-N9cWHMvLvqBqSRQkaor': {
    body: 'Hello',
    createdAt: 1660684674684,
    createdById: '105986699029334209805',
    type: 'message',
  },
  '-N9cWIO5NUi3II4AEH32': {
    body: 'This is all working again!',
    createdAt: 1660684678870,
    createdById: '105986699029334209805',
    type: 'message',
  },
  '-N9gbkywlgKBu4fLX7mi': {
    body: 'This works',
    createdAt: 1660753481679,
    createdById: '118153377351485973303',
    type: 'message',
  },
  '-N9gbn1uLcB5VX6UbNce': {
    body: 'And yes',
    createdAt: 1660753490123,
    createdById: '118153377351485973303',
    type: 'message',
  },
  '-N9gbnVi6-IiImHFrWiF': {
    body: 'we are here',
    createdAt: 1660753492111,
    createdById: '118153377351485973303',
    type: 'message',
  },
  '-N9hJtcMV9ZIfSs5lc8U': {
    body: 'Hello',
    createdAt: 1660765313576,
    createdById: '105986699029334209805',
    type: 'message',
  },
  '-N9hKwOOVH7nIM71zvPF': {
    body: 'Test',
    createdAt: 1660765587055,
    createdById: '105986699029334209805',
    type: 'message',
  },
  '-N9hL3JouFVuZ8Awf-8h': {
    body: 'This is working',
    createdAt: 1660765619528,
    createdById: '105986699029334209805',
    type: 'message',
  },
  '-N9hL8WdGX2dS2I6L5-c': {
    body: "Cool it's super fast now",
    createdAt: 1660765640828,
    createdById: '105986699029334209805',
    type: 'message',
  },
  '-N9hMIXo9_e2l8z2MGIT': {
    body: 'It works',
    createdAt: 1660765944005,
    createdById: '105986699029334209805',
    type: 'message',
  },
  '-N9hlSOKgTD09hGxRGu3': {
    body: 'Webhook',
    createdAt: 1660772800105,
    createdById: '118153377351485973303',
    type: 'message',
  },
  '-N9hnD4dWB7S7-60dRif': {
    body: 'Heythere',
    createdAt: 1660773261699,
    createdById: '105986699029334209805',
    type: 'message',
  },
  '-N9hoemSh1lqWyKFgMZu': {
    body: 'one more time',
    createdAt: 1660773641402,
    createdById: '118153377351485973303',
    type: 'message',
  },
  '-N9hql5mTk4_PAMzd7y8': {
    body: 'howdy',
    createdAt: 1660774191563,
    createdById: '118153377351485973303',
    type: 'message',
  },
};

const isConnected = true;
const isEmpty = false;

const placeholder =
  props.composerPrompt != null
    ? props.composerPrompt
    : isEmpty
    ? 'Add a comment'
    : 'Reply to this comment';

const userId = '107156259038502012149';
const profiles = {
  '113383695894979946430': {
    avatar:
      'https://lh3.googleusercontent.com/a/AItbvmmLTNhnvS8SIPjSvq4-mmP1OHxbsl_OcdKP7BrK=s96-c',
    color: 'sky',
    email: 'ville@example.com',
    id: '113383695894979946430',
    name: 'Ville Immonen',
  },
  '105986699029334209805': {
    avatar:
      'https://lh3.googleusercontent.com/a/AItbvmlTMTUoqMqH5ZmN3O0-tZ-DyFYr1JES2FytZrSg=s96-c',
    color: 'sand',
    email: 'namit@example.com',
    id: '105986699029334209805',
    name: 'Namit Chadha',
  },
  '107156259038502012149': {
    avatar:
      'https://lh3.googleusercontent.com/a/AItbvmkPvG-2pAPQPU_tpnunnQBZygrr9cdduxpopxWEkw=s96-c',
    color: 'yellow',
    email: 'immonenv@example.com',
    name: 'Ville',
  },
  '118153377351485973303': {
    avatar:
      'https://lh3.googleusercontent.com/a-/AFdZucowweFAjjo4_0YrUmdCdCx7A5JTVT6iui0VE_eyKA=s96-c',
    color: 'mauve',
    email: 'namit.chadha@example.com',
    id: '118153377351485973303',
    name: 'Namit Chadha',
  },
};

const profile = profiles[userId];
</script>

<template>
  <StyledThreadContainer>
    <StyledThread>
      <StyledThreadHeader v-if="showHeader">
        <StyledThreadHeaderTitle>Comments</StyledThreadHeaderTitle>
      </StyledThreadHeader>
      <EmptyState v-if="isConnected && isEmpty" />
      <ScrollableCommentList
        v-if="!isEmpty && timeline && workspaceId"
        :isTyping="workspace?.composers[threadId]?.isTyping"
        :profiles="profiles"
        :threadId="threadId"
        :userId="userId"
        :workspaceId="workspaceId"
        :timeline="timeline"
      />
      <Composer
        :style="{ paddingBottom: '12px' }"
        :workspace="workspace"
        :placeholder="placeholder"
        :workspaceId="workspaceId"
        :profile="profile"
        :threadId="threadId"
        :isFloating="false"
      />
    </StyledThread>
  </StyledThreadContainer>
</template>
