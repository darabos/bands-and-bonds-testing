import type { Room } from './base';

export const allRooms: Room[] = [
  {
    x: 407, y: 527, type: "none", next: {
      'Enter the Dungeon': { label: 'enter', description: 'Treasures and adventure await inside.', skipConfirmation: true },
    },
  },
  { x: 407, y: 484, type: "combat", name: "Wild Slime", label: 'enter', },
  {
    x: 407, y: 419, type: "rescue", name: "Lamplighter",
    next: {
      'Turn left': {
        label: 'left1',
        description: 'You see a door to the left. It hangs ajar, and you can hear the sound of movement from beyond it.',
      },
      'Go straight': {
        label: 'straight1',
        description: 'A heavy door stands in front of you. It is barred from this side. You can open it if you dare.',
      },
      'Turn right': {
        label: 'right1',
        description: 'A quiet corridor leads into an ill-maintained part of the dungeon.',
      },
    },
  },
  { x: 455, y: 419, type: "combat", name: 'Poison Crow', label: 'right1' },
  { x: 501, y: 419, type: "combat", name: 'Animated Skeleton' },
  { x: 501, y: 477, type: "combat", name: 'Thick Door' },
  { x: 454, y: 477, type: "rescue", name: 'Friend of Metal', end: true },

  { x: 345, y: 419, type: "combat", name: 'Bandlings', label: 'left1' },
  { x: 304, y: 419, type: "none" },
  { x: 304, y: 493, type: "none" },
  { x: 350, y: 493, type: "none" },
  { x: 350, y: 461, type: "rescue", name: 'The Silent Song', end: true },

  {
    x: 407, y: 359, type: "boss", label: 'straight1', name: 'Dead Gladiator',
    next: { 'Turn left': { label: 'main-left' }, 'Turn right': { label: 'main-right' } }
  },
  { x: 342, y: 359, type: "rescue", name: 'Dark Chef', label: 'main-left' },
  { x: 288, y: 359, type: "none" },
  { x: 288, y: 343, type: "combat", name: "Lobster Daddy" },
  { x: 288, y: 293, type: "rescue", name: 'Royal Fruitbearer' },
  {
    x: 288, y: 236, type: "combat", name: 'Will-o-Wasp',
    next: { 'Turn left': { label: 'left2' }, 'Go straight': { label: 'straight2' } },
  },
  { x: 288, y: 219, type: "none", label: 'straight2' },
  { x: 351, y: 219, type: "combat", name: 'The Shroud' },
  { x: 351, y: 244, type: "none" },
  { x: 332, y: 244, type: "none" },
  { x: 332, y: 279, type: "combat", name: 'Dark Lord' },
  { x: 332, y: 318, type: "rescue", name: 'Lord of Gears' },
  { x: 358, y: 318, type: "none" },
  { x: 358, y: 289, type: "none" },
  { x: 407, y: 289, type: "boss", name: 'Clockomancer', end: true },

  { x: 288, y: 243, type: "none", label: 'left2' },
  { x: 248, y: 243, type: "combat", name: 'Glass Dragon' },
  { x: 243, y: 243, type: "none" },
  { x: 243, y: 341, type: "combat", name: 'Xaranthian Construct' },
  { x: 243, y: 379, type: "none" },
  { x: 277, y: 379, type: "none" },
  {
    x: 277, y: 413, type: "none",
    next: { 'Turn left': { label: 'left3' }, 'Go straight': { label: 'straight3' } },
  },
  { x: 243, y: 413, type: "combat", name: 'Frog Assassin', label: 'left3', end: true },
  {
    x: 277, y: 459, type: "none", label: 'straight3',
    next: { 'Turn left': { label: 'left4' }, 'Go straight': { label: 'straight4' } },
  },
  { x: 243, y: 459, type: "rescue", name: "Pecquer", label: 'left4', end: true },
  { x: 277, y: 498, type: "none", label: 'straight4' },
  {
    x: 196, y: 498, type: "none",
    next: { 'Go straight': { label: 'straight5' }, 'Turn right': { label: 'right5' } },
  },
  { x: 196, y: 460, type: "combat", name: 'Fortified Door', label: 'right5' },
  { x: 196, y: 410, type: "rescue", name: 'Knight of Claws' },
  { x: 196, y: 350, type: "combat", name: 'Master of Doors' },
  { x: 196, y: 300, type: "rescue", name: 'Kit Flash', end: true },
  {
    x: 126, y: 498, type: "none", label: 'straight5',
    next: { 'Go straight': { label: 'straight6' }, 'Turn right': { label: 'right6' } },
  },
  { x: 126, y: 466, type: "combat", name: 'Dryfin Carp', label: 'right6' },
  { x: 126, y: 390, type: "rescue", name: 'Mongreler', end: true },
  { x: 68, y: 498, type: "none", label: 'straight6' },
  { x: 68, y: 323, type: "none" },
  { x: 124, y: 323, type: "boss" },
  { x: 124, y: 264, type: "rescue", name: 'Kevin' },
  { x: 124, y: 206, type: "combat", name: 'Skeletron' },
  {
    x: 124, y: 160, type: "none",
    next: { 'Turn left': { label: 'left7' }, 'Turn right': { label: 'right7' } },
  },
  { x: 84, y: 160, type: "none", label: 'left7' },
  { x: 84, y: 193, type: "none", },
  { x: 69, y: 193, type: "combat", name: 'King of Tadpoles' },
  { x: 59, y: 193, type: "none", },
  { x: 59, y: 240, type: "none", },
  { x: 69, y: 240, type: "combat", name: 'Striped Horror' },
  { x: 84, y: 240, type: "none", },
  { x: 84, y: 288, type: "none", },
  { x: 69, y: 288, type: "rescue", name: 'Azrekta', end: true },

  { x: 173, y: 160, type: "none", label: 'right7' },
  { x: 173, y: 252, type: "none" },
  { x: 219, y: 252, type: "none" },
  { x: 219, y: 219, type: "none" },
  { x: 254, y: 219, type: "none" },
  { x: 254, y: 205, type: "none" },
  { x: 278, y: 205, type: "none" },
  { x: 278, y: 185, type: "none" },
  { x: 291, y: 185, type: "combat", name: "Jaw Maw Maw" },
  { x: 291, y: 175, type: "none" },
  { x: 232, y: 175, type: "none" },
  { x: 232, y: 193, type: "none" },
  { x: 198, y: 193, type: "none" },
  { x: 198, y: 122, type: "none" },
  { x: 210, y: 122, type: "combat", name: 'Zakatrixos' },
  {
    x: 246, y: 122, type: "combat",
    next: { 'Turn left': { label: 'left8' }, 'Go straight': { label: 'straight8' } },
  },
  { x: 282, y: 122, type: "combat", name: "Geckalog", label: 'straight8' },
  { x: 318, y: 122, type: "combat", name: "Artifact Seeker" },
  { x: 325, y: 122, type: "none" },
  { x: 325, y: 185, type: "none" },
  { x: 330, y: 185, type: "rescue", name: 'Kin of Pump', end: true },

  {
    x: 246, y: 79, type: "combat", name: "Skyrmions", label: 'left8',
    next: { 'Turn left': { label: 'left9' }, 'Turn right': { label: 'right9' } },
  },
  { x: 162, y: 79, type: "combat", name: "Tenebra", label: 'left9' },
  { x: 162, y: 123, type: "combat", name: "Landas Wizard" },
  { x: 95, y: 123, type: "none" },
  { x: 95, y: 98, type: "rescue", name: 'Pur Lion', end: true },

  { x: 246, y: 70, type: "none", label: 'right9' },
  { x: 282, y: 70, type: "combat", name: 'Defensive Installation' },
  { x: 314, y: 70, type: "rescue", name: 'Xaranthian Constructor', end: true },

  { x: 474, y: 359, type: "combat", name: 'Frozen Centurion', label: 'main-right', },
  { x: 501, y: 359, type: "none" },
  {
    x: 501, y: 322, type: "rescue", name: 'Anvilomancer',
    next: { 'Turn left': { label: 'left10' }, 'Turn right': { label: 'right10' } },
  },
  { x: 459, y: 322, type: "combat", name: 'Trollish Maiden', label: 'left10' },
  { x: 459, y: 277, type: "combat", name: 'Sullen Bearer' },
  { x: 501, y: 277, type: "rescue", name: 'Eighth Swimmer' },
  { x: 501, y: 230, type: "combat", name: 'Lost Swimmer' },
  { x: 459, y: 230, type: "combat", name: 'Potato Golem' },
  { x: 407, y: 230, type: "rescue", name: 'Coldblade', end: true },

  { x: 547, y: 322, type: "combat", name: 'Frozen Centurion', label: 'right10' },
  { x: 547, y: 277, type: "combat", name: 'Core Diver' },
  { x: 547, y: 230, type: "combat", name: 'Smother Mother' },
  { x: 601, y: 230, type: "rescue", name: 'Wayfinder' },
  { x: 601, y: 245, type: "none" },
  { x: 584, y: 245, type: "none" },
  { x: 584, y: 274, type: "none" },
  { x: 614, y: 274, type: "none" },
  { x: 614, y: 299, type: "none" },
  { x: 584, y: 299, type: "none" },
  { x: 584, y: 323, type: "none" },
  { x: 601, y: 323, type: "none" },
  { x: 601, y: 339, type: "combat", name: 'Corrupted Bounty Hunter' },
  { x: 601, y: 356, type: "none" },
  { x: 547, y: 356, type: "none" },
  { x: 547, y: 367, type: "rescue", name: 'Desert Rabbit' },
  { x: 547, y: 378, type: "none" },
  { x: 617, y: 378, type: "none" },
  { x: 617, y: 420, type: "boss" },
  { x: 554, y: 420, type: "rescue", name: 'Bayla' },
  { x: 554, y: 477, type: "combat", name: "Chago's Chamber" },
  { x: 642, y: 477, type: "combat", name: 'Chago' },
  { x: 697, y: 477, type: "combat" },
  { x: 721, y: 477, type: "none" },
  { x: 721, y: 426, type: "combat" },
  { x: 676, y: 426, type: "combat" },
  { x: 676, y: 380, type: "combat" },
  { x: 721, y: 380, type: "combat" },
  { x: 721, y: 343, type: "none" },
  { x: 666, y: 343, type: "none" },
  { x: 666, y: 309, type: "combat" },
  { x: 666, y: 252, type: "combat" },
  { x: 698, y: 252, type: "combat" },
  { x: 698, y: 309, type: "none" },
  { x: 733, y: 309, type: "rescue", name: "Smiling Pilot" },
  { x: 733, y: 252, type: "combat" },
  { x: 733, y: 205, type: "none" },
  { x: 687, y: 205, type: "rescue", name: "Hedge Lost" },
  { x: 697, y: 205, type: "none" },
  { x: 697, y: 149, type: "none" },
  { x: 709, y: 149, type: "combat" },
  { x: 709, y: 137, type: "none" },
  { x: 744, y: 137, type: "none" },
  { x: 744, y: 76, type: "none" },
  { x: 733, y: 76, type: "combat" },
  { x: 733, y: 65, type: "none" },
  { x: 607, y: 65, type: "none" },
  { x: 607, y: 76, type: "combat" },
  { x: 607, y: 112, type: "none" },
  { x: 628, y: 112, type: "none" },
  { x: 628, y: 121, type: "combat" },
  { x: 639, y: 121, type: "none" },
  { x: 639, y: 167, type: "none" },
  { x: 628, y: 167, type: "combat" },
  { x: 628, y: 177, type: "none" },
  { x: 526, y: 177, type: "rescue", name: 'Zaktar Kadoque' },
  { x: 526, y: 142, type: "none" },
  { x: 540, y: 142, type: "combat" },
  { x: 540, y: 69, type: "combat" },
  { x: 503, y: 69, type: "combat" },
  { x: 503, y: 127, type: "combat" },

  { x: 407, y: 127, type: "finalboss", name: 'Skelemasterion', end: true },
];

export function turnsToPath(numSteps: number, turns: string[]): Room[] {
  const rooms = [] as Room[];
  const _turns = [...turns];
  let target = undefined as string | undefined;
  for (const room of allRooms) {
    if (target && room.label === target) {
      target = undefined;
    }
    if (target) continue;
    rooms.push(room);
    if (room.end || rooms.length === numSteps + 1) return rooms;
    if (room.next) {
      const step = _turns.shift() ?? '';
      target = room.next[step]?.label;
    }
  }
  return rooms;
}

export function roomKey(room: Room): string {
  return `${room.x},${room.y}`;
}

export function destinationToPath(destination: string): Room[] {
  const rooms = [] as Room[];
  let i = allRooms.findIndex(room => roomKey(room) === destination);
  while (i > 0) {
    rooms.unshift(allRooms[i]);
    const label = allRooms[i].label;
    if (label) {
      while (true) {
        i -= 1;
        const next = allRooms[i].next;
        if (next && Object.values(next).some(turn => turn.label === label)) {
          break;
        }
      }
    } else {
      i -= 1;
    }
  }
  rooms.unshift(allRooms[0]);
  return rooms;
}
