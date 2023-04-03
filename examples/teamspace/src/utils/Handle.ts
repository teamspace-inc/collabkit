import { TLBoundsHandle, TLBoundsEdge, TLBoundsCorner } from '@tldraw/core';

export enum HandleId {
  Top = 1,
  Right = 2,
  Bottom = 3,
  Left = 4,
  TopLeft = 5,
  TopRight = 6,
  BottomRight = 7,
  BottomLeft = 8,
}

export function fromTLBoundsHandle(boundsHandle: TLBoundsHandle | undefined): HandleId | undefined {
  switch (boundsHandle) {
    case TLBoundsEdge.Top:
      return HandleId.Top;
    case TLBoundsEdge.Right:
      return HandleId.Right;
    case TLBoundsEdge.Bottom:
      return HandleId.Bottom;
    case TLBoundsEdge.Left:
      return HandleId.Left;
    case TLBoundsCorner.TopLeft:
      return HandleId.TopLeft;
    case TLBoundsCorner.TopRight:
      return HandleId.TopRight;
    case TLBoundsCorner.BottomRight:
      return HandleId.BottomRight;
    case TLBoundsCorner.BottomLeft:
      return HandleId.BottomLeft;
    default:
      console.warn('[Handle.fromTLBoundsHandle] unexpected boundsHandle: ', boundsHandle);
      return undefined;
  }
}

export function toTLBoundsHandle(
  handleId: number | undefined
): TLBoundsEdge | TLBoundsCorner | undefined {
  switch (handleId) {
    case HandleId.Top:
      return TLBoundsEdge.Top;
    case HandleId.Right:
      return TLBoundsEdge.Right;
    case HandleId.Bottom:
      return TLBoundsEdge.Bottom;
    case HandleId.Left:
      return TLBoundsEdge.Left;
    case HandleId.TopLeft:
      return TLBoundsCorner.TopLeft;
    case HandleId.TopRight:
      return TLBoundsCorner.TopRight;
    case HandleId.BottomRight:
      return TLBoundsCorner.BottomRight;
    case HandleId.BottomLeft:
      return TLBoundsCorner.BottomLeft;
    default:
      console.warn('[Handle.toTLBoundsHandle] unexpected handleId: ', handleId);
      return undefined;
  }
}
