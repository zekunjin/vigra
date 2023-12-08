import { computed, ref } from 'vue'
import { useElementBounding } from '@vueuse/core'
import { Canvas } from '@antv/g'
import type { GraphProps } from './graph'

export interface UseGraphProps extends GraphProps {}

export const useGraph = (props: UseGraphProps) => {
  const domRef = ref()
  const { width, height } = useElementBounding(domRef)

  const canvas = computed(() => {
    return new Canvas({
      container: domRef.value,
      width: width.value,
      height: height.value,
      renderer: props.renderer
    })
  })

  return { domRef, canvas }
}
