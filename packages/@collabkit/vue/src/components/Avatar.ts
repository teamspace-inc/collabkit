import { defineComponent, h, inject } from 'vue';
import { ProvidedSlotsKey } from '../constants';
import DefaultAvatar from './DefaultAvatar.vue';
import type { ProvidedSlots } from '../types';

export default defineComponent({
  props: {
    profile: Object,
  },
  setup(props, { attrs }) {
    const slots = inject<ProvidedSlots>(ProvidedSlotsKey);
    return () => {
      if (slots?.avatar) {
        return slots.avatar({ ...attrs, ...props });
      }
      return h(DefaultAvatar as any, { ...attrs, ...props });
    };
  },
});
