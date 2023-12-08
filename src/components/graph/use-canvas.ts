import { Canvas } from '@antv/g'
import { useElementBounding } from '@vueuse/core'
import { type MaybeRef, unref, type Ref, ref, nextTick, watch } from 'vue'
import type { Renderer } from '@antv/g-canvas'
import type { UseGraphProps } from './use-graph'

const onResize = (canvas: MaybeRef<Canvas | undefined>) => (width: MaybeRef<number>, height: MaybeRef<number>) => {
  const _c = unref(canvas)
  if (!_c) { return }
  _c.resize(unref(width), unref(height))
}

const onChangeRenderer = (canvas: MaybeRef<Canvas | undefined>) => (renderer: Renderer) => {
  const _c = unref(canvas)
  if (!_c) { return }
  _c.setRenderer(renderer)
}

export const useCanvas = (container: Ref, options: UseGraphProps) => {
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
    onResize(canvas)(w, h)
  })

  watch(() => options.renderer, (r) => {
    onChangeRenderer(canvas)(r)
  })

  asyncCanvas()

  return { canvas }
}
