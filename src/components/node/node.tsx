import { defineComponent, type ExtractPropTypes, type PropType } from 'vue'

const props = {
  id: { type: String },
  draggable: { type: Boolean, default: true },
  style: { type: Object as PropType<Record<string, any>> }
}

export type NodeProps = ExtractPropTypes<typeof props>

export const Node = defineComponent({
  props
})
