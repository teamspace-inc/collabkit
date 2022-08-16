import { defineComponent, h } from 'vue';
import { css } from '@stitches/react';

export function styled(type, ...args) {
  const cssComponent = css(...args);

  const styledComponent = defineComponent({
    setup(props, { slots }) {
      const { props: forwardProps } = cssComponent(props);
      return () => h(type, forwardProps, slots.default?.());
    },
  });
  return styledComponent;
}
