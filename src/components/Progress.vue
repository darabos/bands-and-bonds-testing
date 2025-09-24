<script setup lang="ts">
import { numberFormat } from '../base.ts'

defineProps<{
  value: number
  max: number
  color?: string
  label?: string
  title?: string
}>()
</script>

<template>
  <div class="progress-container" :title="title">
    <div class="progress-bar" v-show="value > 0" :style="{ width: `${(value / max) * 100}%`, backgroundColor: color }">
    </div>
    <div class="progress-text numbers" v-if="value === max">
      {{ numberFormat(max) }} {{ label }}
    </div>
    <div class="progress-text numbers" v-else>
      {{ numberFormat(value) }} / {{ numberFormat(max) }} {{ label }}
    </div>
  </div>
</template>

<style scoped>
.progress-container {
  position: relative;
  width: 200px;
  background-color: #333;
  border-radius: 4px;
  border: 1px solid #000;
  overflow: hidden;
  margin-top: 8px;
  margin-left: auto;
  margin-right: auto;
}

.progress-bar {
  position: absolute;
  height: 100%;
  background-color: #4caf50;
  border-right: 1px solid #000;
  transition: width 0.1s;
}

.progress-text {
  position: relative;
  padding: 0 8px;
  font-weight: bold;
  font-size: 20px;
  text-align: right;
}
</style>
