<script lang="ts" setup>
import { computed } from "vue";
import { costOfPacks } from "../base.ts";
import { lastRun, store } from "../store.ts";
import Fruit from "./Fruit.vue";
import Num from "./Num.vue";
import Packs from "./Packs.vue";
const fruitSpent = computed(() => lastRun.value?.packsBought.reduce((a, b) => a + b, 0) ?? 0);
</script>

<template>
  <Transition>
    <div v-if="lastRun" class="retreat-results">
      <h1><Fruit/>Retreated<Fruit/></h1>
      <table class="math" v-if="lastRun.fruit > 0">
        <tr>
          <td>
            Collected on this run:
          </td>
          <td>
            <Fruit :amount="lastRun.fruit" />
          </td>
        </tr>
        <tr>
          <td>From earlier:</td>
          <td>
            <Fruit :amount="store.team.fruit - costOfPacks(store.team.packs) - lastRun.fruit + fruitSpent" />
          </td>
        </tr>
        <tr>
          <td>Total:</td>
          <td>
            <Fruit :start-amount="store.team.fruit - costOfPacks(store.team.packs) - lastRun.fruit + fruitSpent"
              :amount="store.team.fruit - costOfPacks(store.team.packs) + fruitSpent" />
          </td>
        </tr>
        <tr v-for="price in lastRun.packsBought">
          <td>+
            <Packs :amount="1" />
          </td>
          <td>
            −
            <Fruit :amount="price" />
          </td>
        </tr>
        <tr>
          <td>Remaining:</td>
          <td>
            <Fruit :start-amount="store.team.fruit - fruitSpent"
              :amount="store.team.fruit - costOfPacks(store.team.packs)" />
          </td>
        </tr>
        <tr>
          <td>Price of next
            <Packs /> :
          </td>
          <td>
            <Fruit :start-amount="lastRun.packsBought[0] ?? 5"
              :amount="costOfPacks(store.team.packs) - costOfPacks(store.team.packs - 1)" />
          </td>
        </tr>
      </table>
      <p v-if="lastRun.weaponLevelAdded > 0">
        You gained {{ lastRun.weaponLevelAdded }} weapon levels during the run.
        <template v-if="lastRun.hadAnvilomancer">
          Anvilomancer converted {{ Math.floor(Math.sqrt(lastRun.weaponLevelAdded)) }} of those into permanent upgrades.
        </template>
      </p>
    </div>
  </Transition>
</template>

<style scoped>
.retreat-results {
  font-weight: bold;
}

td {
  text-align: right;
}
</style>
