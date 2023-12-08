import { ref } from 'vue'
import type { Renderer } from '@antv/g-canvas'
import type { GraphProps } from './graph'
import { useCanvas } from './use-canvas'

export interface UseGraphProps extends GraphProps { }

export interface UseCanvasOptions { renderer: Renderer }

export const useGraph = (props: UseGraphProps) => {
  const domRef = ref()
  const { canvas } = useCanvas(domRef, props)

  return { domRef, canvas }
}
