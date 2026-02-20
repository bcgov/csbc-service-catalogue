import * as migration_20260220_171022_initial from './20260220_171022_initial';

export const migrations = [
  {
    up: migration_20260220_171022_initial.up,
    down: migration_20260220_171022_initial.down,
    name: '20260220_171022_initial'
  },
];
