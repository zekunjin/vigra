import { computed, ref, useSlots, watch } from 'vue'
import type { Renderer } from '@antv/g-canvas'
import { Group, Rect } from '@antv/g'
import interact from 'interactjs'
import { diff } from 'ohash'
import { pickChildren } from '../../utils/vue'
import { Node, type NodeProps } from '../node'
import { defineNode } from '../node/use-node'
import type { GraphProps } from './graph'
import { useCanvas } from './use-canvas'

const nodes: Record<string, any> = {}

export interface UseGraphProps extends GraphProps { }

export interface UseCanvasOptions { renderer: Renderer }

export const useGraph = (props: UseGraphProps) => {
  const domRef = ref()
  const slots = useSlots()
  const { canvas } = useCanvas(domRef, props)

  const nodesProps = computed(() => {
    const [_, n] = pickChildren(slots.default?.(), Node)
    if (!n) { return {} }
    const r: Record<string, NodeProps> = {}
    n.forEach(({ props }) => { r[props.id] = props })
    return r
  })

  watch(nodesProps, async (currVal, prevVal) => {
    await canvas.value?.ready

    diff(prevVal, currVal).forEach(({ type, newValue: { value } }) => {
      if (type === 'added') { insert(value) }
    })
  }, { immediate: true })

  const insert = (node: NodeProps) => {
    if (!canvas.value || !node.id) { return }
    const _n = defineNode(node)
    nodes[node.id] = _n
    canvas.value.appendChild(nodes[node.id])

    if (node.draggable) {
      interact(nodes[node.id] as unknown as HTMLElement, { context: canvas.value?.document as any }).draggable({
        onmove (event) {
          const { dx, dy } = event
          if (!node.id) { return }
          nodes[node.id].translateLocal(dx, dy)
        }
      })
    }
  }

  return { domRef, canvas }
}
