import { defineComponent, h } from 'vue';
import { css } from '@stitches/react';

export function styled(type: any, ...args: any[]) {
  const cssComponent = css(...args);

  const styledComponent = defineComponent({
    setup(props, { slots, attrs }) {
      const { props: forwardProps } = cssComponent({ ...props, ...attrs });
      return () => h(type, forwardProps, slots.default?.());
    },
  });
  return styledComponent;
}
