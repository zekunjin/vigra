import { type Canvas, Rect, type DisplayObject } from '@antv/g'
import type { NodeProps } from './node'

export const defineNode = (props: NodeProps) => {
  if (!props.id) { return }
  return new Rect({
    id: props.id,
    style: {
      cursor: props.draggable ? 'move' : 'auto',
      ...props.style
    } as any
  })
}

export const bindDraggableEvent = (canvas?: Canvas) => (node: DisplayObject) => {
  if (!canvas) { return }
  node.addEventListener('pointerdown', (event: any) => {
    const shiftX = event.clientX - node.getBoundingClientRect().left
    const shiftY = event.clientY - node.getBoundingClientRect().top

    const moveAt = (canvasX: number, canvasY: number) => {
      node.style.x = canvasX - shiftX + 'px'
      node.style.y = canvasY - shiftY + 'px'
    }

    moveAt(event.canvasX, event.canvasY)

    const onMouseMove = (event: any) => {
      moveAt(event.canvasX, event.canvasY)
    }

    canvas.document.addEventListener('pointermove', onMouseMove)

    node.addEventListener(
      'pointerup',
      () => { canvas.document.removeEventListener('pointermove', onMouseMove) },
      { once: true }
    )
  })
}
