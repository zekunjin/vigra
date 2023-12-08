<script setup lang="ts">
import { Graph, Node } from 'vigra'
import { nanoid } from 'nanoid'
import { ref } from 'vue'

const nodes = ref([
  { key: nanoid() }
])

setTimeout(() => {
  nodes.value.push({ key: nanoid() })
}, 3000)
</script>

<template>
  {{ nodes }}
  <Graph :style="{ height: '100vh', width: '100vw' }">
    <Node
      v-for="node in nodes"
      :id="node.key"
      :key="node.key"
      :draggable="true"
      :style="{
        width: 100,
        height: 100,
        fill: '#1890FF',
        stroke: '#F04864',
        lineWidth: 4,
      }"
    />
  </Graph>
</template>
