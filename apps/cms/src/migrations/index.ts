import * as migration_20260220_171022_initial from './20260220_171022_initial';
import * as migration_20260304_222004_refactor_services_and_versions from './20260304_222004_refactor_services_and_versions';
import * as migration_20260304_225634_allow_multiple_eligibility_criteria from './20260304_225634_allow_multiple_eligibility_criteria';
import * as migration_20260305_012745_add_version_products_and_processing_time from './20260305_012745_add_version_products_and_processing_time';

export const migrations = [
  {
    up: migration_20260220_171022_initial.up,
    down: migration_20260220_171022_initial.down,
    name: '20260220_171022_initial',
  },
  {
    up: migration_20260304_222004_refactor_services_and_versions.up,
    down: migration_20260304_222004_refactor_services_and_versions.down,
    name: '20260304_222004_refactor_services_and_versions',
  },
  {
    up: migration_20260304_225634_allow_multiple_eligibility_criteria.up,
    down: migration_20260304_225634_allow_multiple_eligibility_criteria.down,
    name: '20260304_225634_allow_multiple_eligibility_criteria',
  },
  {
    up: migration_20260305_012745_add_version_products_and_processing_time.up,
    down: migration_20260305_012745_add_version_products_and_processing_time.down,
    name: '20260305_012745_add_version_products_and_processing_time'
  },
];
