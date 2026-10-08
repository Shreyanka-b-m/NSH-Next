import * as migration_20260921_121321_initial from './20260921_121321_initial';
import * as migration_20260924_100749_form_builder from './20260924_100749_form_builder';
import * as migration_20260929_044605_site_migrations from './20260929_044605_site_migrations';
import * as migration_20261005_110819_seo_plugin from './20261005_110819_seo_plugin';
import * as migration_20261006_065149_site_settings from './20261006_065149_site_settings';
import * as migration_20261006_070612_page_seo from './20261006_070612_page_seo';
import * as migration_20261006_110123_redirects from './20261006_110123_redirects';
import * as migration_20261008_052156_blog_posts from './20261008_052156_blog_posts';

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
    name: '20260929_044605_site_migrations',
  },
  {
    up: migration_20261005_110819_seo_plugin.up,
    down: migration_20261005_110819_seo_plugin.down,
    name: '20261005_110819_seo_plugin',
  },
  {
    up: migration_20261006_065149_site_settings.up,
    down: migration_20261006_065149_site_settings.down,
    name: '20261006_065149_site_settings',
  },
  {
    up: migration_20261006_070612_page_seo.up,
    down: migration_20261006_070612_page_seo.down,
    name: '20261006_070612_page_seo',
  },
  {
    up: migration_20261006_110123_redirects.up,
    down: migration_20261006_110123_redirects.down,
    name: '20261006_110123_redirects',
  },
  {
    up: migration_20261008_052156_blog_posts.up,
    down: migration_20261008_052156_blog_posts.down,
    name: '20261008_052156_blog_posts'
  },
];
