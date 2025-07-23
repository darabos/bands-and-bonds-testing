import { computed, reactive, ref, watch } from 'vue';
import { allRooms, turnsToPath, roomKey, destinationToPath } from './rooms.ts';
import { allEnemies, enemiesByName } from './enemies.ts';
import { friendsByName } from './friends.ts';
import * as base from './base';
import * as online from './online.ts';

export function startingRoomData(): base.RoomData {
  // Everything specific to the current room. Deleted when leaving the room.
  return {
    damage: 0,
    armorDamage: 0,
    poison: 0,
    kills: 0,
    xaranthian: {
      factories: 0,
      turtles: 0,
      deployers: 0,
      growers: 0,
      guns: 0,
    },
  };
}
export function startingRunData(): base.RunData {
  // Everything specific to the current run. Deleted when the run ends.
  return {
    weaponLevelAdded: 0,
    desertBlessingMultiplier: 2,
    speedLevel: 1,
    steps: 0,
    turns: [],
    gold: 0,
    fruit: 0,
    saplings: 0,
    skips: 0,
    capturedMonsters: [],
    room: startingRoomData(),
    timers: {} as Record<string, base.Timer>,
    skipTime: 0,
  };
}

function startingBand(): base.Band {
  return {
    width: 5,
    height: 5,
    12: 'Stick Master',
  };
}
function startingUnlocked(): string[] {
  return ['Stick Master'];
}
function startingDiscovered(): string[] {
  return [];
}
function startingSettings(): base.Settings {
  return {
    blurImages: false,
    online: false,
    sound: true,
  };
}
export function startingLocalData(): base.LocalData {
  return {
    band: startingBand(),
    settings: startingSettings(),
  };
}
function startingTeamData(): base.TeamData {
  return {
    fruit: 2,
    packs: 1,
    bestWeaponLevel: 1,
    unlocked: startingUnlocked(),
    discovered: startingDiscovered(),
    name: 'Unnamed Guild',
  };
}

const V = '3';
const dataVersion = localStorage.getItem('bnb-version');
if (dataVersion !== V) {
  localStorage.clear();
  localStorage.setItem('bnb-version', V);
  window.location.reload();
}
const loadedRunData = localStorage.getItem('bnb-run');
export const runData = reactive<base.RunData>(loadedRunData ? JSON.parse(loadedRunData) : startingRunData());
// Compatibility.
if (!runData.capturedMonsters) {
  runData.capturedMonsters = [];
}
const loadedLocal = localStorage.getItem('bnb-local');
export const localData = reactive<base.LocalData>(loadedLocal ? JSON.parse(loadedLocal) : startingLocalData());
const loadedTeam = localStorage.getItem('bnb-team');
export const teamData = reactive<base.TeamData>(loadedTeam ? JSON.parse(loadedTeam) : startingTeamData());
export const store: base.Store = {
  run: runData,
  local: localData,
  team: teamData,
  startTimer(key: string, t: base.Timer) {
    if (store.run.timers[key]) return; // Already started.
    const cost = t.cost ?? {};
    cost.gold ??= 0;
    cost.fruit ??= 0;
    if (store.run.gold < cost.gold || store.run.fruit < cost.fruit) return; // Not enough resources.
    store.run.gold -= cost.gold || 0;
    store.run.fruit -= cost.fruit || 0;
    store.run.timers[key] = t;
  },
  timerFinished(key: string, t: base.Timer, times: number) {
    timerFinished(key, t, times);
  },
  currentRoom() {
    return current.value.room ?? allRooms[0];
  },
  currentEnemy() {
    return current.value.enemy;
  },
  currentPath() {
    return current.value.path ?? allRooms[0];
  },
  addDamage(x: number, times: number) {
    return addDamage(x, times);
  },
  addPoison(x: number) {
    const armor = (store.currentEnemy()?.armor ?? 0) - store.run.room.armorDamage;
    store.run.room.poison += Math.max(0, x - armor);
  },
  bandByName() {
    return bandByName.value;
  },
  onboard(name: string) {
    return onboard(name);
  },
  emptySpacesAround(row: number, col: number) {
    const empty: { row: number, col: number }[] = [];
    for (const [r, c] of [[row - 1, col], [row + 1, col], [row, col - 1], [row, col + 1]] as [number, number][]) {
      const place = c + r * store.local.band.width;
      if (store.available(r, c) && !store.local.band[place]) {
        empty.push({ row: r, col: c });
      }
    }
    return empty;
  },
  available(row: number, col: number): boolean {
    const dist = Math.max(Math.abs(row - 2), Math.abs(col - 2));
    if (lightRadius.value === 'radius3') return dist <= 2;
    if (lightRadius.value === 'radius2') return dist <= 1;
    return dist === 0;
  },
  lightRadius() {
    return lightRadius.value;
  },
  getRewards(enemy) {
    let gold = enemy.rewards?.gold ?? 0;
    const fruit = (enemy.rewards?.fruit ?? 0) * store.fruitMultiplier();
    if (onboard("King of Pump")) {
      gold *= gold;
    } else if (onboard("Kin of Pump")) {
      gold *= 2;
    }
    return { gold, fruit };
  },
  fruitMultiplier() {
    const bandSize = Object.keys(bandByName.value).length;
    let m = 1;
    if (onboard("Royal Fruitbearer")) {
      m *= bandSize;
    }
    if (onboard("Royal Fruitwearer")) {
      m *= bandSize - 1;
    }
    return m;
  },
  takeTurn(turn) {
    return takeTurn(turn);
  },
  abilityEffects(ab) {
    return abilityEffects(ab);
  },
  weaponLevel() {
    if (onboard("Anvilominator")) {
      return store.team.bestWeaponLevel + store.run.weaponLevelAdded;
    }
    if (onboard("Anvilomancer")) {
      return Math.floor(Math.sqrt(store.team.bestWeaponLevel)) + store.run.weaponLevelAdded;
    }
    return 1;
  },
}

const lightRadius = computed(() => {
  const lamplighter = friendAt(2, 2)?.name === 'Lamplighter';
  if (!lamplighter) return 'radius1';
  if (nextTo('Azrekta', 2, 2)) {
    return 'radius3';
  }
  return 'radius2';
});

watch(store.run, (newValue) => {
  localStorage.setItem('bnb-run', JSON.stringify(newValue))
}, { deep: true });
watch(store.local, (newValue) => {
  localStorage.setItem('bnb-local', JSON.stringify(newValue))
  if (store.local.settings.online && store.local.settings.teamId) {
    online.subscribe(store.local.settings.teamId, store);
  }
}, { deep: true });
if (store.local.settings.online && store.local.settings.teamId) {
  online.subscribe(store.local.settings.teamId, store);
}
watch(store.team, (newValue) => {
  localStorage.setItem('bnb-team', JSON.stringify(newValue))
  if (store.local.settings.online && store.local.settings.teamId) {
    online.updateTeam(store.local.settings.teamId, newValue);
  }
}, { deep: true });

const current = computed(() => {
  const path = turnsToPath(store.run.steps, store.run.turns);
  const room = path[path.length - 1];
  const enemy = ['combat', 'boss', 'finalboss'].includes(room.type) ? allEnemies.find((e) => e.name === room.name) : undefined;
  return { path, room, enemy };
});

function addDamage(x: number, times: number) {
  const enemy = store.currentEnemy();
  if (!enemy) return;
  if (store.run.room.damage >= enemy.health) return; // Already defeated.
  let dmg = x;
  const capturing = onboard("Mongreler");
  if (capturing) {
    dmg = Math.floor(dmg / 100);
  }
  dmg -= (enemy.armor ?? 0) - store.run.room.armorDamage;
  if (dmg < 0) return;
  store.run.room.damage += dmg * times;
  // TODO: Implement multi-kill.
  if (store.run.room.damage >= enemy.health) {
    store.run.room.kills += 1;
    const remaining = (enemy.count ?? 1) - store.run.room.kills;
    if (remaining > 0) {
      store.run.room.damage = 0;
      store.run.room.armorDamage = 0;
      store.run.room.poison = 0;
    } else {
      // Victory!
      if (!window.location.search.includes('test')) {
        store.run.timers.celebrating = { duration: 1000 };
      }
      store.run.room.damage = enemy.health;
      store.run.room.poison = 0;
      const rewards = store.getRewards(enemy);
      store.run.gold += rewards.gold;
      store.run.fruit += rewards.fruit;
      if (capturing) {
        if (!store.run.capturedMonsters.includes(enemy.name)) {
          store.run.capturedMonsters.push(enemy.name);
        }
      }
    }
  }
}

function takeTurn(turn: string) {
  store.run.room = startingRoomData();
  store.run.steps += 1;
  if (turn !== 'Keep going') {
    store.run.turns.push(turn);
  }
  let path = turnsToPath(store.run.steps, store.run.turns);
  let room = path[path.length - 1];
  while (room.type === 'none' && !room.next) {
    // Skip rooms with nothing to do.
    store.run.steps += 1;
    path = turnsToPath(store.run.steps, store.run.turns);
    room = path[path.length - 1];
  }
  if (!store.team.discovered.includes(roomKey(room))) {
    store.team.discovered.push(roomKey(room));
  }
}

export function describeAbility(ab: base.Ability, e: base.AbilityEffects): string {
  let d = ab.description;
  if (typeof d === "function") {
    d = d(store, ab);
  }
  if (ab.damage) {
    const dmg = Math.floor(getAbilityBaseDamage(ab) * e.damageMultiplier / e.weaknessMultiplier);
    const text = e.weaknessMultiplier > 1 ?
      `${base.numberFormat(e.weaknessMultiplier)} × ${base.numberFormat(dmg)}` : base.numberFormat(dmg);
    d += `\n\n<span class="numbers">${text}</span> damage`;
  }
  return d;
}

export const ethereal = computed(() => {
  if (onboard("Kevout")) return false;
  if (store.run.timers["ability-Pierce the Veil"]) return false;
  return onboard("Azrekta") || store.currentEnemy()?.ethereal;
});

export function abilityEffects(ab: base.Ability): base.AbilityEffects {
  const undodgeable = ab.tags?.includes('undodgeable') || onboard("Seventh Swimmer") && store.run.timers["ability-Flood"];
  let hitChance = 1;
  const enemy = store.currentEnemy();
  if (!undodgeable && enemy?.dodge) {
    const duration = ab.duration / store.run.speedLevel;
    const dodgeChance = Math.min(1, duration / enemy.dodge);
    hitChance *= 1 - dodgeChance;
  }
  if (!undodgeable && ethereal.value) {
    hitChance *= 0.1;
  }
  let mult = 1;
  mult *= store.weaponLevel();
  if (onboard("The Silent Quartet") || ab.source && nextTo("The Silent Song", ab.source.row, ab.source.col)) {
    mult *= 2;
  }
  let weaknessMultiplier = 1;
  for (const immunity of enemy?.immune ?? []) {
    if (ab.tags?.includes(immunity)) {
      mult *= 0;
    }
  }
  if (enemy && onboard("Desert Rabbit")) {
    for (const weakness of getWeaknesses(enemy)) {
      if (ab.tags?.includes(weakness)) {
        weaknessMultiplier *= store.run.desertBlessingMultiplier;
      }
      const center = onboard("Lamplighter");
      if (!center || !ab.source) continue;
      if (weakness === 'left' && ab.source.col < center.col) {
        weaknessMultiplier *= store.run.desertBlessingMultiplier;
      } else if (weakness === 'right' && ab.source.col > center.col) {
        weaknessMultiplier *= store.run.desertBlessingMultiplier;
      } else if (weakness === 'front' && ab.source.row < center.row) {
        weaknessMultiplier *= store.run.desertBlessingMultiplier;
      } else if (weakness === 'back' && ab.source.row > center.row) {
        weaknessMultiplier *= store.run.desertBlessingMultiplier;
      }
    }
  }
  return {
    damageMultiplier: mult * weaknessMultiplier,
    weaknessMultiplier,
    hitChance,
    rndHits: (numAttacks: number) => rndHits(numAttacks, hitChance),
  };
}

function rndHits(numAttacks: number, hitChance: number): number {
  if (hitChance >= 1) return numAttacks;
  if (numAttacks < 10) {
    let hits = 0;
    for (let i = 0; i < numAttacks; i++) {
      if (Math.random() < hitChance) {
        hits += 1;
      }
    }
    return hits;
  }
  // For larger numbers of attacks, use a normal approximation.
  const mean = numAttacks * hitChance;
  const stdDev = Math.sqrt(numAttacks * hitChance * (1 - hitChance));
  // Use https://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform to get standard normal.
  const u1 = Math.random();
  const u2 = Math.random();
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  // Shift to the desired mean and stddev and clip.
  return Math.max(0, Math.min(numAttacks, Math.round(mean + z * stdDev)));
}

export function getWeaknesses(enemy: base.Enemy | null) {
  if (!enemy) return [];
  const weaknesses = enemy.weaknesses ?? [];
  if (onboard("Kevin") && !onboard("Kevout") && !weaknesses.includes('fire')) {
    return [...weaknesses, 'fire'];
  }
  return weaknesses;
}

export function getAbilityBaseDamage(ab: base.Ability): number {
  if (!ab.damage) return 0;
  let dmg = ab.damage;
  if (typeof dmg === "function") {
    dmg = dmg(store);
  }
  return dmg;
}

function findAbility(key: string): base.Ability | undefined {
  if (key.startsWith('ability-')) {
    return abilities.value.find(a => `ability-${a.name}` === key);
  } else if (key.startsWith('monster-')) {
    const m = /monster-(.*)-ability-(.*)/.exec(key);
    if (!m) return;
    const [, monster, abilityName] = m;
    return enemiesByName[monster]?.abilities?.find(a => a.name === abilityName);
  }
}

function timerFinished(key: string, timer: base.Timer, times: number) {
  delete store.run.timers[key];
  if (key === 'rescue-unlock') {
    return unlockRescue();
  } else if (key === 'wayfinder-turn' && plannedTurn.value?.title) {
    return takePlannedTurn(plannedTurn.value.title);
  }
  const ab = findAbility(key);
  if (!ab) return;
  // The timer has been paid for once in advance. See how many runs we can afford.
  let _times = times;
  if (ab.preventRepeat) {
    _times = 1;
  } else {
    if (timer.cost?.gold) _times = Math.min(_times, store.run.gold / (timer.cost?.gold ?? 1));
    if (timer.cost?.fruit) _times = Math.min(_times, store.run.fruit / (timer.cost?.fruit ?? 1));
    if (timer.cost?.gold) store.run.gold -= timer.cost?.gold * _times;
    if (timer.cost?.fruit) store.run.fruit -= timer.cost?.fruit * _times;
  }
  if (_times && ab) {
    executeAbility(ab, _times);
  }
  if (timer.automatic) store.startTimer(key, timer);
}

export const KEEP_GOING: base.Turn = { title: 'Keep going', description: 'Continue exploring the dungeon.' };
export const plannedTurn = computed(() => {
  const wf = onboard("Wayfinder");
  if (store.run.steps === 0 || !wf || !store.local.destination) return;
  const room = store.currentRoom();
  if (roomKey(room) === store.local.destination && wf.row < 2) {
    return { title: 'Retreat', description: 'The Wayfinder leads you back to the beginning.' };
  }
  if (room.end) return;
  const path = destinationToPath(store.local.destination);
  if (path.length <= store.run.steps + 1) return;
  if (!room.next) return roomKey(room) === roomKey(path[store.run.steps]) ? KEEP_GOING : undefined;
  const nextRoom = path[store.run.steps + 1];
  for (const [title, next] of Object.entries(room.next)) {
    if (nextRoom.label === next.label) {
      return { title, description: next.description };
    }
  }
});
function takePlannedTurn(turn: string) {
  if (turn === 'Retreat') {
    retreat();
    store.run.steps += 1; // Get started on the next run immediately.
  } else {
    store.takeTurn(turn);
  }
}

export function retreat() {
  if (store.run.fruit) {
    store.team.fruit += store.run.fruit;
  }
  if (store.weaponLevel() > store.team.bestWeaponLevel) {
    store.team.bestWeaponLevel = store.weaponLevel();
  }
  const capturedMonsters = store.run.capturedMonsters;
  Object.assign(store.run, startingRunData());
  if (onboard("Monster Juggler")) {
    store.run.capturedMonsters = capturedMonsters;
  }
}

export const abilities = computed(() => {
  const abilities = [] as base.Ability[];
  const allAutomatic = !!onboard('Gear of Lords');
  const band = store.local.band;
  for (let row = 0; row < band.height; row++) {
    for (let col = 0; col < band.width; col++) {
      const place = col + row * band.width;
      const friend = friendsByName[band[place]];
      if (!friend) continue;
      const automatic = allAutomatic || !!nextTo('Lord of Gears', row, col);
      const az = nextTo('Azrekta', row, col);
      const abs = (az && friend.super?.abilities) || friend.abilities || [];
      for (const ab of abs) {
        if (ab.hidden?.(store)) continue;
        abilities.push({ ...ab, automatic, source: { name: friend.name, row, col } });
      }
    }
  }
  return abilities;
});

function executeAbility(ab: base.Ability, times: number) {
  if (ab.onCompleted) {
    return ab.onCompleted(store, times, ab);
  }
  if (ab.damage) {
    const e = abilityEffects(ab);
    const hits = e.rndHits(times);
    const dmg = getAbilityBaseDamage(ab);
    store.addDamage(Math.floor(dmg * e.damageMultiplier), hits);
  }
}

export const bandByName = computed(() => {
  const byName = {} as Record<string, { row: number, col: number }>;
  for (let row = 0; row < store.local.band.height; row++) {
    for (let col = 0; col < store.local.band.width; col++) {
      const place = col + row * store.local.band.width;
      const n = store.local.band[place];
      if (n) {
        byName[n] = { row, col };
      }
    }
  }
  const az = byName.Azrekta;
  if (az) {
    for (const [row, col] of [[az.row - 1, az.col], [az.row + 1, az.col], [az.row, az.col - 1], [az.row, az.col + 1]] as [number, number][]) {
      const place = col + row * store.local.band.width;
      const n = store.local.band[place];
      if (!n) continue;
      const friend = friendsByName[n];
      if (friend?.super?.name) {
        delete byName[friend.name];
        byName[friend.super.name] = { row, col };
      }
    }
  }
  return byName;
});

export function friendAt(row: number, col: number): base.Friend | undefined {
  return friendsByName[store.local.band[col + row * store.local.band.width]];
}
export function nextTo(name: string, row: number, col: number): [number, number] | null {
  const sw = name === 'Azrekta' && nextTo('Smiling Wizard', row, col);
  if (sw) return sw;
  const b = bandByName.value[name];
  return b && Math.abs(b.row - row) + Math.abs(b.col - col) === 1 ? [b.row, b.col] : null;
}
export function onboard(name: string): { row: number, col: number } | undefined {
  const sup = friendsByName[name].super?.name;
  return bandByName.value[name] || sup && bandByName.value[sup];
}

export const rescuedFriend = computed(() => {
  const room = store.currentRoom();
  if (room?.type === 'rescue' && room.name) {
    return friendsByName[room.name];
  }
});
export const rescueAvailable = computed(() => {
  const friend = rescuedFriend.value;
  return friend && !store.team.unlocked.includes(friend.name);
});
export const justRescued = ref<base.Friend | null>(null);
function unlockRescue() {
  const friend = rescuedFriend.value;
  if (!friend) return;
  if (store.team.unlocked.includes(friend.name)) return;
  store.team.unlocked.push(friend.name);
  justRescued.value = friend;
}
watch(() => store.run.steps, () => {
  if (justRescued.value && store.currentRoom().name !== justRescued.value.name) {
    justRescued.value = null;
  }
});
