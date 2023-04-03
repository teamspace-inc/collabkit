import React from 'react'
import { renderWithContext } from '~test'
import { Shape } from './shape'
import { BoxUtil, boxShape } from '~shape-utils/TLShapeUtil.spec'
import type { TLShapeUtil } from '~shape-utils'
import type { TLShape } from '~types'

describe('shape', () => {
  test('mounts component without crashing', () => {
    renderWithContext(
      <Shape
        shape={boxShape}
        utils={new BoxUtil() as unknown as TLShapeUtil<TLShape>}
        isEditing={false}
        isBinding={false}
        isHovered={false}
        isSelected={false}
        isDragging={false}
        isResizing={false}
        hasSize={true}
      />
    )
  })
})

// { shape: TLShape; ref: ForwardedRef<Element>; } & TLComponentProps<any, any> & RefAttributes<Element>
// { shape: BoxShape; ref: ForwardedRef<any>; } & TLComponentProps<any, any> & RefAttributes<any>'
