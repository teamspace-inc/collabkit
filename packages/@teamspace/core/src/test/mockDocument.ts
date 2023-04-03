import type { BoxShape } from '~shape-utils/TLShapeUtil.spec'
import type { TLBinding, TLPage, TLPageState, TLShape } from '~types'

export const mockDocument: { page: TLPage<BoxShape, TLBinding>; pageState: TLPageState<BoxShape> } =
  {
    page: {
      id: 'page1',
      shapes: {},
      bindings: {},
    },
    pageState: {
      id: 'page1',
      clipboard: {
        count: 0,
        ids: [],
        state: 'idle',
      },
      followingId: null,
      hiddenIds: [],
      selectedIds: [],
      isDragging: false,
      isResizing: false,
      camera: {
        point: [0, 0],
        zoom: 1,
      },
      hasSizes: {},
    },
  }
