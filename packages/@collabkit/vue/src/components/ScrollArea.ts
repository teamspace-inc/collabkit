import { scrollAreaStyles } from '@collabkit/theme';
import { css } from '@stitches/react';
import { defineComponent, h, ref } from 'vue';
import { styled } from './styled';

// TODO: port @radix-ui/react-scroll-area to Vue
const ScrollArea = {
  Root: styled('div'),
  Scrollbar: styled('div'),
  Thumb: styled('div'),
  Corner: styled('div'),
};

export const ScrollAreaViewport = defineComponent({
  setup(props, { slots, attrs, expose }) {
    const cssComponent = css(scrollAreaStyles.viewport, {
      overflow: 'auto',
    });
    const element = ref<HTMLDivElement | null>(null);
    expose({ element });
    return () => {
      const { props: forwardProps } = cssComponent({ ...props, ...attrs });
      return h('div', { ...forwardProps, ref: element }, slots.default?.());
    };
  },
});

export const ScrollAreaRoot = styled(ScrollArea.Root, scrollAreaStyles.root);
export const ScrollAreaScrollbar = styled(ScrollArea.Scrollbar, scrollAreaStyles.scrollbar);
export const ScrollAreaThumb = styled(ScrollArea.Thumb, scrollAreaStyles.thumb);
export const ScrollAreaCorner = styled(ScrollArea.Corner, scrollAreaStyles.corner);
