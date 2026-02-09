# Upgrading to LiVue 1.0

## From 0.x (Development)

LiVue 1.0 is the first stable release. If you were using a 0.x development version:

### Breaking Changes from 0.6.x

None. v1.0 is a stabilization release with no API changes from v0.6.3.

### Deprecations

- `protected array $guarded = []` on components is deprecated.
  Use `#[Guarded]` attribute on individual properties instead.
  The array syntax will be removed in v2.0.

### New in 1.0

- Comprehensive security test suite (checksum, method protection, request validation)
- Controller and middleware integration tests
- Console command tests for all Artisan commands
- Component resolution tests
- JavaScript tests for v-dirty, v-watch, composables, morph utilities
- Echo channel limitation documented for persisted components
- CHANGELOG.md and UPGRADE.md documentation
