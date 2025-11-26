# Copilot Instructions

This repository contains an experimental multi-map rendering library that provides a common interface for rendering map data across multiple mapping libraries.

## Project Overview

- **Framework**: Vue 3 with Composition API (`<script setup>`)
- **Language**: TypeScript
- **Build Tool**: Vite
- **Package Manager**: pnpm
- **Styling**: Tailwind CSS 4.x
- **UI Components**: shadcn-vue (reka-ui based)

## Supported Map Libraries

The project provides adapter interfaces for the following mapping libraries:

- **OpenLayers** (`ol`)
- **MapLibre GL** (`maplibre-gl`)
- **Leaflet** (`leaflet`)
- **globe.gl** (`globe.gl`)

## Project Structure

- `src/multimaplib/` - Core multi-map adapter library
  - `adapters.ts` - Map-specific adapter implementations
  - `common.ts` - Shared types and utilities
- `src/components/` - Vue components
  - `*Map.vue` - Map-specific Vue components
  - `ui/` - shadcn-vue UI components
- `src/lib/` - Utility functions

## Development Commands

```bash
pnpm install    # Install dependencies
pnpm dev        # Start development server
pnpm build      # Build for production (runs vue-tsc and vite build)
pnpm format     # Format code with Prettier
```

## Coding Guidelines

### TypeScript

- Use TypeScript for all new code
- Prefer explicit type annotations for function parameters and return types
- Use the `@/` path alias for imports from `src/`

### Vue Components

- Use `<script setup lang="ts">` syntax
- Use `useTemplateRef()` for template refs
- Emit events with `defineEmits()` for component communication
- Follow the existing pattern for map component lifecycle (mount/unmount cleanup)

### Map Adapters

When adding new map library support:

1. Create an adapter function in `src/multimaplib/adapters.ts` following the `MapAdapter` interface
2. Create a Vue component in `src/components/` that:
   - Initializes the map on mount
   - Cleans up resources on unmount
   - Emits a `ready` event with the adapter instance

### Styling

- Use Tailwind CSS utility classes
- Follow the existing pattern with `h-full w-full` for map containers
- Use shadcn-vue components for UI elements

### Code Formatting

- Run `pnpm format` before committing
- Prettier is configured with default settings
