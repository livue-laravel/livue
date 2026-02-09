# Changelog

All notable changes to LiVue are documented in this file.

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
