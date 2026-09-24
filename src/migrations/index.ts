import * as migration_20260921_121321_initial from './20260921_121321_initial'
import * as migration_20260924_100749_form_builder from './20260924_100749_form_builder'

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
]
