# CLAUDE.md

This file guides Claude Code when working in this repository.

## Purpose

A personal React refresher: small, single-concept examples for relearning React fundamentals (components, props, PropTypes, and so on). Keep the code simple and readable for learning. Put a short explanatory comment above each new concept, as [Student.jsx](reactRefresher/src/Student.jsx) does.

## Layout

The app lives in `reactRefresher/` (Vite + React 19, plain JavaScript/JSX, no TypeScript).

- `src/main.jsx`: entry point; renders `<App />` inside `StrictMode`
- `src/App.jsx`: composes the example components
- `src/Student.jsx`: props example with default values and PropTypes
- `src/index.css`, `src/App.css`: styles

## Commands

Run these from `reactRefresher/`:

- `npm run dev`: start the Vite dev server with HMR
- `npm run build`: production build to `dist/`
- `npm run lint`: ESLint (flat config with the react-hooks and react-refresh plugins)
- `npm run preview`: serve the production build

## Conventions

- Use function components, with one component per file and a default export.
- Use double quotes and semicolons, matching the existing files.
- Set prop defaults with destructuring defaults, not `defaultProps`.
- `prop-types` is installed, but React 19 ignores PropTypes at runtime, so they only document the props.
- There are no tests yet.
