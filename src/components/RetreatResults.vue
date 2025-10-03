<script lang="ts" setup>
import { costOfPacks } from "../base.ts";
import { lastRun, store } from "../store.ts";
import Fruit from "./Fruit.vue";
import WeaponLevel from "./WeaponLevel.vue";
import { computed, ref } from "vue";
const show = ref(true); // For easier testing.
const weaponLevelPreserved = computed(() => {
  if (!lastRun.value) return 0;
  return lastRun.value.hadAnvilomancer
    ? Math.floor(Math.sqrt(lastRun.value.weaponLevelAdded))
    : 0;
});
</script>

<template>
  <Transition>
    <div v-if="lastRun" class="retreat-results">
      <h1 class="header-top" @click="show = !show">
        <img src="/images/generated/fruit.webp" class="decoration-1" />
        <img src="/images/generated/fruit.webp" class="decoration-2" />
        <img src="/images/generated/fruit.webp" class="decoration-3" />
        Retreated
        <img src="/images/generated/fruit.webp" class="decoration-3" />
        <img src="/images/generated/fruit.webp" class="decoration-2" />
        <img src="/images/generated/fruit.webp" class="decoration-1" />
      </h1>
      <table class="math" v-if="show && (lastRun.fruit > 0 || lastRun.weaponLevelAdded > 0)">
        <tr>
          <td class="label">
            Collected:
          </td>
          <td>
            <Fruit :amount="lastRun.fruit" :start-amount="1" />
          </td>
          <td v-if="lastRun.weaponLevelAdded > 0">
            <WeaponLevel :amount="lastRun.weaponLevelAdded" :start-amount="1" />
          </td>
        </tr>
        <tr v-if="weaponLevelPreserved > 0 && lastRun.hadAnvilomancer">
          <td colspan="2" class="label">
            Anvilomancer preserves:
          </td>
          <td>
            <WeaponLevel :amount="weaponLevelPreserved" :permanent="true" :start-amount="1" />
          </td>
        </tr>
        <tr>
          <td class="label">You have:</td>
          <td>
            <Fruit :start-amount="store.team.fruit - costOfPacks(store.team.packs) - lastRun.fruit"
              :amount="store.team.fruit - costOfPacks(store.team.packs)" />
          </td>
          <td v-if="store.team.bestWeaponLevel > 1">
            <WeaponLevel :amount="store.team.bestWeaponLevel" :permanent="true"
              :start-amount="store.team.bestWeaponLevel - weaponLevelPreserved" />
          </td>
        </tr>
      </table>
      <h1 class="header-bottom">
        <img src="/images/generated/fruit.webp" class="decoration-1" />
        <img src="/images/generated/fruit.webp" class="decoration-2" />
        <img src="/images/generated/fruit.webp" class="decoration-3" />
        <img src="/images/generated/fruit.webp" class="decoration-2" />
        <img src="/images/generated/fruit.webp" class="decoration-1" />
      </h1>
    </div>
  </Transition>
</template>

<style scoped>
.retreat-results {
  font-weight: bold;
}

td {
  text-align: right;
  padding: 0 30px;
}

.decoration-1 {
  width: 7px;
  padding: 0 2px
}

.decoration-2 {
  width: 11px;
}

.decoration-3 {
  width: 15px;
}

.header-top,
.header-bottom {
  box-sizing: border-box;
  border: 30px solid transparent;
  border-top: none;
  border-bottom: none;
  padding: 2px 20px;
}

.header-top {
  border-top: none;
  border-bottom: 1px solid #edb;

  img {
    margin-bottom: -2px;
  }
}

.header-bottom {
  border-top: 1px solid #edb;
  padding-top: 5px;

  img {
    vertical-align: top;
  }
}

td.label {
  text-align: left;
}
</style>
