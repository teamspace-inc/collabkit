import { actions, createStore } from '@collabkit/client';
import { reactive } from 'vue';

export type Actions = typeof actions;

export function createVueStore() {
  return reactive(createStore());

  // // XXX: When in Vue land, the type of store is Ref<Store>,
  // // but to avoid having to depend on @vue/reactivity in the @collabkit/client,
  // // we instead cast is as a Store so the actions can remain agnostic to Vue type.
  // const store = storeRef as unknown as Store;

  // return {
  //   store: storeRef,
  //   actions: {
  //     init: actions.init.bind(null, store),
  //     monitorConnection: actions.monitorConnection.bind(null, store),
  //     startThread: actions.startThread.bind(null, store),
  //     subscribeInbox: actions.subscribeInbox.bind(null, store),
  //     stopTyping: actions.stopTyping.bind(null, store),
  //     closeThread: actions.closeThread.bind(null, store),
  //     isTyping: actions.isTyping.bind(null, store),
  //     stopSelecting: actions.stopSelecting.bind(null, store),
  //     startSelecting: actions.startSelecting.bind(null, store),
  //     subscribeThread: actions.subscribeThread.bind(null, store),
  //     seen: actions.seen.bind(null, store),
  //     subscribeSeen: actions.subscribeSeen.bind(null, store),
  //     subscribeProfiles: actions.subscribeProfiles.bind(null, store),
  //     saveProfile: actions.saveProfile.bind(null, store),
  //     authenticate: actions.authenticate.bind(null, store),
  //     subscribePins: actions.subscribePins.bind(null, store),
  //     subscribeWorkspace: actions.subscribeWorkspace.bind(null, store),
  //     registerThread: actions.registerThread.bind(null, store),
  //     focus: actions.focus.bind(null, store),
  //     blur: actions.blur.bind(null, store),
  //     toggleCommentReaction: actions.toggleCommentReaction.bind(null, store),
  //     toggleEmojiReactionPicker: actions.toggleEmojiReactionPicker.bind(null, store),
  //     closeEmojiReactionPicker: actions.closeEmojiReactionPicker.bind(null, store),
  //     reopenThread: actions.reopenThread.bind(null, store),
  //     resolve: actions.resolve.bind(null, store),
  //     sendMessage: actions.sendMessage.bind(null, store),
  //     placePinAndStartComposingThread: actions.placePinAndStartComposingThread.bind(null, store),
  //     removePendingPins: actions.removePendingPins.bind(null, store),
  //     hover: actions.hover.bind(null, store),
  //     unhover: actions.unhover.bind(null, store),
  //     viewThread: actions.viewThread.bind(null, store),
  //     saveThreadInfo: actions.saveThreadInfo.bind(null, store),
  //   },
  // };
}
