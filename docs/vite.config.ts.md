# vite.config.ts
## Overview
This file configures the Vite build tool for a modern React web application. It defines settings for the development server, production builds, testing environment, and linting. It also integrates code coverage reporting for end-to-end tests run with Cypress.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Configuration Breakdown](#configuration-breakdown)
4. [Useful details](#useful-details)
## Prerequisites
This configuration relies on several npm packages. The primary dependencies are listed in the project's `package.json` and include:

*   `vite`: The core build tool.
*   `@vitejs/plugin-react`: Enables React support (Fast Refresh, JSX).
*   `vite-plugin-eslint`: Integrates ESLint for code quality checks during development.
*   `vite-plugin-istanbul`: Instruments the code to generate test coverage reports.
*   `react` & `react-dom`: The UI library.
*   `vitest` & `jsdom`: For running unit and integration tests.

## Usage
This configuration file is automatically used by Vite when you run its commands from your project's root directory. No direct instantiation is needed.

**Start the development server:**
```bash
npm run dev
# or
vite
```

**Create a production build:**
```bash
npm run build
# or
vite build
```

**Run tests:**
```bash
npm run test
# or
vite test
```

## Configuration Breakdown
The file exports a single configuration object with the following key properties:

| Property        | Description                                                                                                                              |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `define`        | Exposes environment variables (prefixed with `VITE_`) from `.env` files to the client-side code under `process.env`.                      |
| `server`        | Configures the development server, setting it to run on port `3000`.                                                                       |
| `build`         | Defines settings for production builds, specifying the output directory as `build` and enabling source maps for debugging.               |
| `plugins`       | An array of plugins that extend Vite's functionality. This project uses plugins for React support, ESLint, and Istanbul code coverage.   |
| `resolve.alias` | Creates an import alias to ensure the browser-compatible version of the AWS SDK is used, which is a common requirement for AWS Amplify. |
| `test`          | Configures the built-in test runner (Vitest), setting the environment to `jsdom` and specifying test setup files.                        |

## Useful details
*   **Environment Variables**: The configuration uses Vite's `loadEnv` function to safely load environment variables. Only variables prefixed with `VITE_` in your `.env` files will be exposed to the browser, preventing accidental leaks of sensitive keys.
*   **Code Coverage**: The `vite-plugin-istanbul` is specifically configured for Cypress (`cypress: true`). This instruments the application code when building, allowing Cypress to collect coverage data during end-to-end tests.
*   **AWS Amplify Compatibility**: The `resolve.alias` block is a crucial fix for using the AWS Amplify library with Vite. It redirects an import to ensure the correct, browser-friendly module is loaded, preventing build or runtime errors.