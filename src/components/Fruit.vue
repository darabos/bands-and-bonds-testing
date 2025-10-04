<script lang="ts" setup>
import { defineProps } from 'vue';
import Num from './Num.vue';
import NumCounter from './NumCounter.vue';
const props = defineProps<{
  amount?: number;
  startAmount?: number;
}>();
</script>

<template>
  <template v-if="props.amount === undefined">
    <img src="/images/generated/fruit.webp" class="resource-icon resource-icon-solo" />
  </template>
  <template v-else-if="props.startAmount === undefined">
    <Num :amount="props.amount">
      <img src="/images/generated/fruit.webp" class="resource-icon" />
    </Num>
  </template>
  <template v-else>
    <NumCounter :amount="props.amount" :start-amount="props.startAmount">
      <img src="/images/generated/fruit.webp" class="resource-icon" />
    </NumCounter>
  </template>
</template>
