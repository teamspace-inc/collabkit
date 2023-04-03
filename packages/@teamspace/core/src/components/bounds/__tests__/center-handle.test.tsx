import { render, screen } from '@testing-library/react'
import React from 'react'
import { CenterHandle } from '../center-handle'

jest.spyOn(console, 'error').mockImplementation(() => void null)

describe('CenterHandle', () => {
  test('mounts component without crashing', () => {
    render(
      <CenterHandle
        isEditing={false}
        shouldRound={true}
        bounds={{ minX: 0, minY: 0, maxX: 100, maxY: 100, width: 100, height: 100 }}
        isLocked={false}
        isHidden={false}
      />
    )
  })
  test('validate attributes for a center handle', () => {
    render(
      <CenterHandle
        isEditing={false}
        shouldRound={true}
        bounds={{ minX: 0, minY: 0, maxX: 100, maxY: 100, width: 100, height: 100 }}
        isLocked={false}
        isHidden={false}
      />
    )
    const centerHandle = screen.getByLabelText('center handle')
    expect(centerHandle).toHaveAttribute('height', '102')
    expect(centerHandle).toHaveAttribute('width', '102')
    expect(centerHandle).toHaveAttribute('x', '-1')
    expect(centerHandle).toHaveAttribute('y', '-1')
    expect(centerHandle).toHaveAttribute('opacity', '1')
  })
  test('validate attributes for a hidden center handle', () => {
    render(
      <CenterHandle
        isEditing={false}
        shouldRound={true}
        bounds={{ minX: 0, minY: 0, maxX: 100, maxY: 100, width: 100, height: 100 }}
        isLocked={false}
        isHidden={true}
      />
    )
    const centerHandle = screen.getByLabelText('center handle')
    expect(centerHandle).toHaveAttribute('height', '102')
    expect(centerHandle).toHaveAttribute('width', '102')
    expect(centerHandle).toHaveAttribute('x', '-1')
    expect(centerHandle).toHaveAttribute('y', '-1')
    expect(centerHandle).toHaveAttribute('opacity', '0')
  })
})
