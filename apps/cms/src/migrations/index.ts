import * as migration_20260217_163115_initial from './20260217_163115_initial';

export const migrations = [
  {
    up: migration_20260217_163115_initial.up,
    down: migration_20260217_163115_initial.down,
    name: '20260217_163115_initial'
  },
];
