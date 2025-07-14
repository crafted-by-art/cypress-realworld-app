# utils.ts
## Overview
This file provides utility functions for Cypress end-to-end tests. Its primary purpose is to help create responsive tests by abstracting common checks, such as determining if the current viewport size corresponds to a mobile device.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Methods](#methods)
4. [Useful details](#properties)

## Prerequisites
This utility is designed to be used within a [Cypress](https://www.cypress.io/) testing environment.

It also requires a `mobileViewportWidthBreakpoint` variable to be set in your Cypress environment configuration (e.g., in `cypress.config.js` or `cypress.env.json`).

**Example `cypress.config.js` setup:**
```javascript
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // ...
  },
  env: {
    mobileViewportWidthBreakpoint: 768,
  },
});
```

## Usage
Import the function into your Cypress spec files to run conditional tests based on the viewport size. This is useful for asserting that different elements are visible or behave differently on mobile vs. desktop.

```typescript
// in your_spec.cy.ts
import { isMobile } from '../support/utils';

describe('Header Navigation', () => {
  it('should show mobile menu on small screens', () => {
    cy.viewport('iphone-xr'); // Set a mobile viewport
    
    if (isMobile()) {
      cy.get('[data-cy="hamburger-menu"]').should('be.visible');
      cy.get('[data-cy="desktop-nav"]').should('not.be.visible');
    }
  });

  it('should show desktop navigation on large screens', () => {
    cy.viewport('macbook-16'); // Set a desktop viewport
    
    if (!isMobile()) {
      cy.get('[data-cy="hamburger-menu"]').should('not.be.visible');
      cy.get('[data-cy="desktop-nav"]').should('be.visible');
    }
  });
});
```

## Methods
### isMobile()
Checks if the current test viewport width is smaller than the globally configured mobile breakpoint.

*   **Parameters:** None.
*   **Returns:** `boolean` - Returns `true` if `Cypress.config("viewportWidth")` is less than `Cypress.env("mobileViewportWidthBreakpoint")`, otherwise `false`.

## Useful details
The behavior of the `isMobile` function is entirely dependent on the `mobileViewportWidthBreakpoint` value in your Cypress configuration. By centralizing this value, you can easily update the breakpoint for your entire test suite in one location.