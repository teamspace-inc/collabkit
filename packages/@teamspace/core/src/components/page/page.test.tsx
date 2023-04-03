import React from 'react'
import { mockDocument, renderWithContext } from '~test'
import { Page } from './page'

describe('page', () => {
  test('mounts component without crashing', () => {
    renderWithContext(
      <Page
        page={mockDocument.page}
        pageState={mockDocument.pageState}
        hideBounds={false}
        hideIndicators={false}
        hideBindingHandles={false}
        hideCloneHandles={false}
        hideRotateHandle={false}
        hideHoveredIndicator={false}
      />
    )
  })
})
