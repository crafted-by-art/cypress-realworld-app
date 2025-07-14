# e2e.ts
## Overview
This file is a Cypress support file used to configure global behaviors that execute before each end-to-end test. Its primary role is to manipulate network requests to create a consistent and realistic test environment. It achieves this by disabling API response caching and simulating slower network speeds for mobile testing scenarios.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Methods](#methods)
4. [Useful details](#properties)
## Prerequisites
This file is part of a Cypress testing setup and relies on the following:
*   **Cypress**: The E2E testing framework.
*   **@cypress/code-coverage/support**: A Cypress plugin for code coverage reporting.
*   **./commands.ts**: A local file containing custom Cypress commands.
*   **./utils.ts**: A local file containing utility functions, specifically `isMobile()`.

## Usage
This file is not meant to be instantiated or called directly. It is automatically loaded by the Cypress test runner before executing test specs, applying its configurations globally. To enable its functionality, it should be imported in the main Cypress support file, which is typically `cypress/support/e2e.ts`.

**Example import in `cypress/support/e2e.ts`:**
```typescript
// cypress/support/e2e.ts
import './commands';
import './e2e'; // Assuming this file is in the same directory
```

## Methods
This file contains a global hook that configures test behavior.

*   `beforeEach(callback)`
    A global Cypress hook that runs before every `it()` block in every spec file. It contains two network interceptors:
    1.  **Cache Busting Interceptor**: Intercepts all outgoing requests to the local API (`http://localhost:3001/**`). It removes the `if-none-match` header from each request to prevent the server from returning a `304 Not Modified` status. This ensures that every test receives fresh data from the API, rather than a cached response.
    2.  **Network Throttling Interceptor**: If the `isMobile()` utility returns `true`, this interceptor is activated. It throttles responses from the API to 1 Mbps, simulating a slower 3G mobile connection. This is useful for testing application performance and behavior under realistic mobile network conditions.

## Useful details
The core purpose of this file is to enhance test reliability and realism.
*   **Test Consistency**: By disabling HTTP caching, the file prevents flaky tests that might arise from using stale data.
*   **Realistic Mobile Simulation**: The conditional network throttling helps uncover loading-state issues, race conditions, or performance bottlenecks that are specific to users on slower mobile networks.
*   **Target API**: The interceptors are specifically configured for `http://localhost:3001/**`, indicating they are meant to modify communication with the application's backend API during tests.