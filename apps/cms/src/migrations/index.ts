import * as migration_20260219_225812_initial from './20260219_225812_initial';

export const migrations = [
  {
    up: migration_20260219_225812_initial.up,
    down: migration_20260219_225812_initial.down,
    name: '20260219_225812_initial'
  },
];
