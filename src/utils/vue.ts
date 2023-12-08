import type { VNode, RendererNode, RendererElement } from 'vue'
import { Fragment } from 'vue'

type VueNode = VNode<RendererNode, RendererElement, { [key: string]: any }>

export const isFragment = (value: any): value is symbol => value === Fragment
const isSymbol = (value: any): value is symbol => typeof value === 'symbol'

export const flatSlots = (slots: VueNode[] | undefined): VueNode[] => {
  if (!slots) { return [] }
  if (!slots.length) { return [] }

  const s: VueNode[] = []

  for (const slot of slots) {
    if (!isSymbol(slot.type)) {
      s.push(slot)
      continue
    }

    if (Array.isArray(slot.children)) {
      slot.children.forEach((i) => {
        if (i && !isSymbol((i as VueNode).type)) {
          s.push(i as VueNode)
        }
      })
    }
  }

  return s
}

export const isSame = (a: any, b: any) => a.type.name === b.name

export const pickChildren = (children: VueNode[] | undefined, targetNode: any) => {
  children = flatSlots(children)
  if (!children.length) { return [[], undefined] }

  const target: VueNode[] = []
  const withoutTargetChildren = children.map((child: any) => {
    if (child.type.name === targetNode.name) {
      target.push(child)
      return null
    }
    return child
  }).filter(Boolean)

  const targetChildren = target.length >= 0 ? target : undefined

  return [withoutTargetChildren, targetChildren]
}
