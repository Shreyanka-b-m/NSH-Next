import * as migration_20260921_121321_initial from './20260921_121321_initial';
import * as migration_20260924_100749_form_builder from './20260924_100749_form_builder';
import * as migration_20260929_044605_site_migrations from './20260929_044605_site_migrations';

export const migrations = [
  {
    up: migration_20260921_121321_initial.up,
    down: migration_20260921_121321_initial.down,
    name: '20260921_121321_initial',
  },
  {
    up: migration_20260924_100749_form_builder.up,
    down: migration_20260924_100749_form_builder.down,
    name: '20260924_100749_form_builder',
  },
  {
    up: migration_20260929_044605_site_migrations.up,
    down: migration_20260929_044605_site_migrations.down,
    name: '20260929_044605_site_migrations'
  },
];
