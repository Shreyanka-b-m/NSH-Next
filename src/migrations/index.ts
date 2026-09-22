import * as migration_20260921_121321_initial from './20260921_121321_initial';

export const migrations = [
  {
    up: migration_20260921_121321_initial.up,
    down: migration_20260921_121321_initial.down,
    name: '20260921_121321_initial'
  },
];
