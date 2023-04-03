import React from 'react'
import { usePosition } from '~hooks'
import { TLShapeUtilsMap } from '~shape-utils'
import { TLShape, ToolPreview as _ToolPreview } from '~types'

type ToolPreviewProps<T extends TLShape> = _ToolPreview<T> & {
  utils: TLShapeUtilsMap<TLShape>
}

export function ToolPreview<T extends TLShape>({ size, point, type, utils }: ToolPreviewProps<T>) {
  if (!point) {
    return null
  }

  const { ToolPreviewComponent } = utils[type]

  const rToolPreview = usePosition({
    minX: point[0],
    minY: point[1],
    width: size[0],
    height: size[1],
    maxX: point[0] + size[0],
    maxY: point[1] + size[1],
  })

  return (
    <div className="tl-positioned tl-absolute" ref={rToolPreview}>
      {ToolPreviewComponent && <ToolPreviewComponent />}
    </div>
  )
}
