<script lang="ts" setup>
import { computed, defineProps, ref } from 'vue';
import { numberFormat } from '../base.ts';
const props = defineProps<{
  amount: number;
  startAmount: number;
}>();
const num = computed(() =>
  Math.round(props.startAmount + (percent.value / 100) * (props.amount - props.startAmount))
);
let percent = ref(0);
const interval = setInterval(() => {
  percent.value += 2.5;
  if (percent.value >= 100) {
    percent.value = 100;
    clearInterval(interval);
  }
}, 25);
</script>

<template>
  <span class="numbers">
    <span class="placeholder">
      {{ numberFormat(1_000_000_000) }}
      <span class="current">{{ numberFormat(num) }}</span>
    </span>&nbsp;<slot></slot>
  </span>
</template>

<style scoped>
.placeholder {
  color: transparent;
}

.current {
  color: white;
  position: absolute;
  transform: translateX(-100%);
}
</style>
