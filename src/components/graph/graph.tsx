import { defineComponent, type ExtractPropTypes, type PropType } from 'vue'
import { Renderer } from '@antv/g-canvas'
import { useGraph } from './use-graph'

const props = {
  as: { type: String as PropType<keyof HTMLElementTagNameMap>, default: 'div' },
  renderer: { type: Object as PropType<Renderer>, default: () => new Renderer() }
}

export type GraphProps = ExtractPropTypes<typeof props>

export const Graph = defineComponent({
  props,

  setup (props) {
    const { domRef } = useGraph(props)

    return () => (
      <props.as ref={domRef} />
    )
  }
})
