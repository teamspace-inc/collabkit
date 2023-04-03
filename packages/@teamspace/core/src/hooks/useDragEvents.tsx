import React from 'react'
import { useTLContext } from './useTLContext'

function getFileFromDragEvent(e: React.DragEvent) {
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    if (e.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (e.dataTransfer.items[i].kind === 'file') {
          const file = e.dataTransfer.items[i].getAsFile()
          if (file) {
            console.debug('drag: ... file[' + i + '].name = ' + file.name)
            return file
          } else {
            console.debug('drag: no file!')
          }
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        console.debug('drag: ... file[' + i + '].name = ' + e.dataTransfer.files[i].name)
      }
    }
  } else {
    console.debug('drag: browser has no File API support')
  }
  return null
}

function readFile(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onprogress = () => {
      // it's pretty instant we can
      // ignore this for now
      console.debug('drag: reading file...')
    }
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = () => {
      reject(reader.error)
    }
    reader.readAsArrayBuffer(file)
  })
}

function isWithinTarget(e: React.DragEvent, ref: React.RefObject<HTMLDivElement>) {
  return ref.current?.contains(e.currentTarget) || false
}

export function useDragEvents(props: { ref: React.RefObject<HTMLDivElement> }) {
  const { callbacks, inputs } = useTLContext()
  const target = { type: 'canvas' }

  const onDrag = React.useCallback(
    (e: React.DragEvent) => {
      e.stopPropagation()
      e.preventDefault()
      const info = inputs.drag(e, target, isWithinTarget(e, props.ref))
      callbacks.onDrag?.(info, e)
    },
    [callbacks, inputs]
  )

  const onDragEnter = React.useCallback(
    (e: React.DragEvent) => {
      e.stopPropagation()
      e.preventDefault()
      const info = inputs.drag(e, target, isWithinTarget(e, props.ref))
      callbacks.onDragEnter?.(info, e)
    },
    [callbacks, inputs]
  )

  const onDragLeave = React.useCallback(
    (e: React.DragEvent) => {
      e.stopPropagation()
      e.preventDefault()
      const info = inputs.drag(e, target, isWithinTarget(e, props.ref))
      callbacks.onDragLeave?.(info, e)
    },
    [callbacks, inputs]
  )

  const onDragStart = React.useCallback(
    (e: React.DragEvent) => {
      e.stopPropagation()
      e.preventDefault()
      const info = inputs.drag(e, target, isWithinTarget(e, props.ref))
      callbacks.onDragStart?.(info, e)
    },
    [callbacks, inputs]
  )

  const onDragOver = React.useCallback(
    (e: React.DragEvent) => {
      e.stopPropagation()
      e.preventDefault()

      // show user it's a copy (+ icon next to cursor)
      e.dataTransfer.dropEffect = 'copy'

      const info = inputs.drag(e, target, isWithinTarget(e, props.ref))
      callbacks.onDragOver?.(info, e)
    },
    [callbacks, inputs]
  )

  const onDragEnd = React.useCallback(
    (e: React.DragEvent) => {
      e.stopPropagation()
      e.preventDefault()
      const info = inputs.drag(e, target, isWithinTarget(e, props.ref))
      callbacks.onDragEnd?.(info, e)
    },
    [callbacks, inputs]
  )

  const onDrop = React.useCallback(
    async (e: React.DragEvent) => {
      e.stopPropagation()
      e.preventDefault()
      const file = getFileFromDragEvent(e)
      // nc: consider moving this to renderer and supplying a onFileReadStart onFileReadProgress and onFileReadEnd event
      const data = file ? await readFile(file) : null
      const info = inputs.drop(e, target, isWithinTarget(e, props.ref), file, data)
      callbacks.onDrop?.(info, e)
    },
    [callbacks, inputs]
  )

  return {
    onDrag,
    onDragEnd,
    onDragStart,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
  }
}
