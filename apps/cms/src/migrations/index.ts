import * as migration_20260220_171022_initial from './20260220_171022_initial';
import * as migration_20260304_222004_refactor_services_and_versions from './20260304_222004_refactor_services_and_versions';
import * as migration_20260304_225634_allow_multiple_eligibility_criteria from './20260304_225634_allow_multiple_eligibility_criteria';

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
    name: '20260304_225634_allow_multiple_eligibility_criteria'
  },
];
