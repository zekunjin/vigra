<script setup lang="ts">
import { Graph, Node } from 'vigra'
import { nanoid } from 'nanoid'
import { ref } from 'vue'

const nodes = ref<{ key: string }[]>([
  { key: nanoid() }
])

const onClick = () => { onPush() }

const onPush = () => {
  nodes.value.push({ key: nanoid() })
}
</script>

<template>
  <div>
    <div :style="{ background: '#fafafa' }">
      {{ nodes }}
    </div>

    <div :style="{ background: '#fafafa' }">
      <button @click.prevent="onClick()">
        add
      </button>
    </div>

    <Graph :style="{ height: '512px' }">
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
  </div>
</template>
