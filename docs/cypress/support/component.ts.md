# component.ts
## Overview
This file serves as the central support and configuration entry point for Cypress component testing. It is automatically processed before any component test files are run. Its primary role is to set up the testing environment by importing necessary utilities, registering custom commands, and applying global configurations like code coverage.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Methods](#methods)
4. [Useful details](#properties)
## Prerequisites
This configuration requires the following Cypress libraries to be installed in the project:
- `@cypress/code-coverage`: For enabling code coverage reports.
- `cypress`: The core Cypress testing framework.
- `cypress/react`: The official Cypress adapter for testing React components.

It also depends on a local `commands.ts` file, which should contain any additional custom Cypress commands.

## Usage
This file is not meant to be imported or used directly in test files. Cypress automatically loads it. The primary interaction for a developer is to leverage the commands and configurations it sets up.

The key feature provided is the `cy.mount()` command, which is used in test files to render and test a React component in isolation.

**Example Test (`MyComponent.cy.tsx`):**
```typescript
import React from 'react';
import { MyComponent } from './MyComponent';

it('renders the component with a message', () => {
  // Use the cy.mount() command configured in support/component.ts
  cy.mount(<MyComponent message="Hello World" />);
  
  cy.contains('Hello World').should('be.visible');
});
```

## Methods
This file adds the following command to the global `cy` object:

### `cy.mount(component, options?)`
Mounts a React component into the test runner's DOM, allowing it to be tested.

-   **`component`** (JSX.Element): The React component to be mounted.
-   **`options`** (Object, optional): Mounting options, such as providing context or router information.

## Useful details
-   **Global Configuration:** This is the ideal location to place any global setup or behavior that should apply to all component tests, such as polyfills, global CSS imports, or mocking global objects.
-   **Custom Commands:** The `import "./commands";` line integrates custom commands defined in `support/commands.ts`. Any new, reusable test actions should be added to that file to be available across all component tests.