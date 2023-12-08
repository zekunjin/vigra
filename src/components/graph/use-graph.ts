import { computed, ref, useSlots, watch } from 'vue'
import type { Renderer } from '@antv/g-canvas'
import { Group, Rect } from '@antv/g'
import interact from 'interactjs'
import { pickChildren } from '../../utils/vue'
import { Node, type NodeProps } from '../node'
import type { GraphProps } from './graph'
import { useCanvas } from './use-canvas'

export interface UseGraphProps extends GraphProps { }

export interface UseCanvasOptions { renderer: Renderer }

export const useGraph = (props: UseGraphProps) => {
  const domRef = ref()
  const slots = useSlots()
  const { canvas } = useCanvas(domRef, props)

  const nodes = computed<Rect[]>(() => {
    const [_, n] = pickChildren(slots.default?.(), Node)
    if (!n) { return [] }
    return n.map(({ props }) => new Rect({
      id: props.id,
      style: props.style
    }))
  })

  watch(nodes, async (value) => {
    await canvas.value?.ready

    value.forEach((_node) => {
      canvas.value?.appendChild(_node)

      interact(_node as unknown as HTMLElement, { context: canvas.value?.document as any }).draggable({
        onmove (event) {
          const { dx, dy } = event
          _node.translateLocal(dx, dy)
        }
      })
    })
  }, { immediate: true })

  return { domRef, canvas }
}
