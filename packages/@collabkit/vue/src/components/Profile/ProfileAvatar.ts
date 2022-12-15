import { defineComponent, h, inject } from 'vue';
import { ProvidedSlotsKey } from '../../constants';
import Avatar from './Avatar.vue';
import type { ProvidedSlots } from '../../types';

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
      return h(Avatar as any, { ...attrs, ...props });
    };
  },
});
