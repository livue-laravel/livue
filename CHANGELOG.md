# Changelog

All notable changes to LiVue are documented in this file.

## [1.5.0] - 2026-03-05

### Added

- `defineStores()` pattern for component-scoped store declaration from PHP, with automatic registration lifecycle
- Dedicated runtime helpers for store resolution split by intent: `useStore(name)` (component-first) and `useGlobalStore(name)` (global-only)
- Expanded showcase coverage for stores/composables/lazy/streaming/error-boundary and related frontend patterns

### Changed

- `v-click` call expressions are now deferred at render time so expressions like `v-click="setPage(page)"` execute only on user interaction
- `v-click` argument syntax (`v-click:method`) is treated as unsupported/deprecated in favor of value syntax (`v-click="method"` / `v-click="method(args)"`)
- Component memo id flow stabilized in request lifecycle so the same component id is preserved across updates

### Fixed

- Fixed production bootstrap issue where store hydration could throw `Cannot read properties of undefined (reading '_s')` by passing the component Pinia instance explicitly to store helpers
- Fixed lazy component runtime integration after helper return-shape updates
- Fixed setup script context so PHP composable namespaces are correctly exposed in `@script`
- Fixed stream controller compatibility path for versions expecting `callMethod()`

## [1.3.0] - 2026-02-22

### Added

- **Unified attribute dispatcher** — centralized `SupportAttributes` hook discovers and dispatches lifecycle calls to all attributes (built-in and custom) via Reflection with per-class caching
- **Custom attributes** — extend the base `Attribute` class to create property, method, or class attributes with automatic lifecycle behavior and zero-config registration
- **Lifecycle events system** — `HasLifecycleEvents` trait enables components to fire and listen to lifecycle events (`booting`, `mounted`, `calling`, `rendered`, etc.)
- **Observer pattern** — `Component::observe()` for registering lifecycle observers, `#[ObservedBy]` attribute for declarative observer attachment
- **Halting events** — `booting`, `mounting`, `hydrating`, `calling`, `dehydrating`, `rendering` can cancel their operation by returning `false`
- **Target-specific attribute stubs** — `make:livue-attribute` command now generates property, method, or class stubs via `--target` flag

### Changed

- All 24 built-in attributes now extend the base `Attribute` class with self-contained lifecycle logic
- Removed 5 individual `Support*` hook classes (`SupportComputed`, `SupportConfirm`, `SupportSession`, `SupportTabSync`, `SupportUrl`) — logic moved into respective attribute Base classes
- `SupportLazy` simplified to static helpers only

### Fixed

- Redesigned pagination view with unified responsive layout
- Resolve PHP attributes from parent classes
- Wrap page component HTML in `HtmlString`
- Filter internal route params from component mount data

## [1.0.4] - 2026-02-22

### Fixed

- Resolve PHP attributes declared on parent classes via recursive Reflection
- Wrap page component HTML in `HtmlString` for proper rendering
- Filter internal route parameters (e.g., `_livue`) from mount data

## [1.0.3] - 2026-02-21

### Fixed

- Use CSS variable fallback for active page background color in pagination view (reverted in v1.0.4)

## [1.0.2] - 2026-02-21

### Changed

- Redesign pagination view with unified responsive layout (Tailwind CSS)

## [1.2.0] - 2026-02-17

### Added

- **Global composables** — `Component::use('composableName')` for registering composables globally across all components
- **Auto-discovery** — composables are automatically discovered from the `$composables` array without manual registration

## [1.1.0] - 2026-02-17

### Added

- **Macroable** — `Component` class now uses the `Macroable` trait, allowing runtime method extension
- **Focus preservation** — input focus is preserved across template swaps during AJAX updates

### Fixed

- Production environment detection in built assets

## [1.0.1] - 2026-02-10

### Fixed

- Recursive synthesizer dehydration/hydration for nested state (arrays/objects containing synthesizable values)

## [1.0.0] - 2026-02-09

### Highlights

First stable release of LiVue - server-driven reactivity for Laravel using Vue.js.

### Core

- PHP Component base class with lifecycle hooks (boot, mount, hydrate, dehydrate, updating, updated, rendering, rendered)
- Blade rendering with `@livue()` directive and `<livue:*/>` component tag syntax
- JavaScript runtime with Vue 3.5 integration and automatic mounting
- Full state synchronization with reactive properties
- Request pooling via `queueMicrotask` (batch AJAX requests)
- Snapshot architecture with HMAC-SHA256 checksums

### Features

- 24 PHP attributes: `#[Layout]`, `#[Title]`, `#[On]`, `#[Validate]`, `#[Renderless]`, `#[Guarded]`, `#[Computed]`, `#[Vue]`, `#[Isolate]`, `#[Url]`, `#[Reactive]`, `#[Lazy]`, `#[Confirm]`, `#[Defer]`, `#[Json]`, `#[Modelable]`, `#[Session]`, `#[Transition]`, `#[Js]`, `#[Css]`, `#[Island]`, `#[TabSync]`, `#[Head]`, `UsePagination`
- 23 Vue directives: `v-model`, `v-click`, `v-navigate`, `v-poll`, `v-offline`, `v-transition`, `v-replace`, `v-loading`, `v-target`, `v-dirty`, `v-sort`, `v-stream`, `v-init`, `v-submit`, `v-current`, `v-intersect`, `v-ignore`, `v-scroll`, `v-watch`, `@teleport`, `@script`
- 7 property synthesizers: Eloquent Model, Carbon, CarbonImmutable, Enum, Collection, Form, TemporaryUploadedFile
- Page components with routing, layouts, and `<head>` management
- SPA navigation with prefetching, page caching, and scroll restoration
- Event system (dispatch, dispatchTo, dispatchSelf)
- Form validation with `#[Validate]` attribute and Form Objects
- File uploads with batch support, validation, preview, and automatic cleanup
- File downloads with encrypted tokens
- PHP Composables for reusable server-side logic
- Broadcasting integration via Laravel Echo
- Streaming (real-time content delivery)
- Lazy loading with intersection observer
- Dirty tracking and tab synchronization
- Error boundaries
- Single File Components (SFC) and Multi File Components (MFC) with CSS scoping
- Hot Module Replacement (HMR) for development
- DevTools panel with 7 tabs
- Custom Vue configuration via `LiVue.setup()`

### Architecture

- Feature-centric PHP architecture with ComponentHook system (35+ modules)
- Reflection-based method protection (blocks magic methods, lifecycle hooks, base class methods)
- HMAC-SHA256 state checksum with timing-safe comparison
- Encrypted class resolution and guarded property encryption
- Persistent middleware re-application on AJAX requests
- Smart asset injection middleware
- CSP nonce support

### Testing

- 20 PHP feature test files (241 tests)
- 43 JavaScript test files (657 tests)
- Testable harness with fluent assertion API
- Security tests for checksum, method protection, and request validation

### Artisan Commands

- `make:livue` (alias: `livue:component`) - Create class-based, SFC, or MFC components
- `make:livue-form` (alias: `livue:form`) - Create Form classes
- `make:livue-composable` (alias: `livue:composable`) - Create Composable traits
- `make:livue-attribute` - Create custom attributes
- `make:livue-synth` - Create custom synthesizers
- `livue:layout` - Generate layout
- `livue:purge-uploads` - Clean temporary uploads

### Known Limitations

- Echo channels for `@persist` components are re-established after SPA navigation rather than being preserved (no functional impact)
- `$guarded` array property is deprecated; use `#[Guarded]` attribute instead (will be removed in v2.0)

### Compatibility

| Requirement | Version |
|---|---|
| PHP | 8.2+ |
| Laravel | 11.x / 12.x |
| Vue | 3.5+ |

### Development (v0.1.0 - v0.6.3)

LiVue was developed through 11+ iterative waves, each adding major functionality:

- **Waves 1-4**: Core component system, state sync, events, validation
- **Waves 5-6**: Page components, navigation, file uploads, downloads
- **Waves 7-8**: Composables, broadcasting, streaming, tab sync
- **Waves 9-10**: JavaScript API, SFC/MFC, HMR, DevTools
- **Wave 11**: Custom Vue configuration, asset management
