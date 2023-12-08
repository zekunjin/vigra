import { nextTick, ref, watch, type MaybeRef, unref, type Ref } from 'vue'
import { useElementBounding } from '@vueuse/core'
import { Canvas } from '@antv/g'
import type { Renderer } from '@antv/g-canvas'
import type { GraphProps } from './graph'

export interface UseGraphProps extends GraphProps { }

export interface UseCanvasOptions { renderer: Renderer }

const onResize = (canvas: Canvas) => (width: MaybeRef<number>, height: MaybeRef<number>) => {
  canvas.resize(unref(width), unref(height))
}

const useCanvas = (container: Ref, options: UseGraphProps) => {
  const canvas = ref<Canvas>()
  const { width, height } = useElementBounding(container)

  const asyncCanvas = async () => {
    await nextTick()
    canvas.value = new Canvas({
      container: container.value,
      width: width.value,
      height: height.value,
      renderer: options.renderer
    })
  }

  watch(() => [width.value, height.value], ([w, h]) => {
    if (!canvas.value) { return }
    onResize(canvas.value)(w, h)
  })

  asyncCanvas()

  return { canvas }
}

export const useGraph = (props: UseGraphProps) => {
  const domRef = ref()
  const canvas = useCanvas(domRef, props)

  return { domRef, canvas }
}
