import { Rect } from '@antv/g'
import type { NodeProps } from './node'

export const defineNode = (props: NodeProps) => {
  return new Rect({ id: props.id, style: props.style as any })
}
