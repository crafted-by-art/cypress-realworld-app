# component-index.html
## Overview
This HTML file serves as the root document or test harness for a web application, specifically configured for component testing with the Cypress framework. Its primary role is to provide a minimal DOM structure, including a dedicated mount point (`<div data-cy-root></div>`), where individual components are rendered for isolated testing.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Methods](#methods)
4. [Useful details](#properties)
## Prerequisites
This file is intended to be used within a project that includes:
*   A JavaScript framework (e.g., React, Vue, Angular).
*   The [Cypress.io](https://www.cypress.io/) testing framework for component or end-to-end testing.
*   A development server/bundler (e.g., Vite, Webpack) that serves this file as the entry point.

## Usage
Developers typically do not interact with or modify this file directly. It is automatically used by the Cypress test runner when initiating component tests. The test runner serves this page and injects the component under test into the `<div data-cy-root></div>` element.

For example, a Cypress component test might look like this:
```javascript
// cypress/component/Button.cy.js

import React from 'react';
import { mount } from 'cypress/react';
import Button from '../../src/components/Button';

it('renders a button', () => {
  // Cypress mounts the Button component into the <div data-cy-root>
  // within component-index.html
  mount(<Button>Click Me</Button>);
  
  cy.get('button').should('contains.text', 'Click Me');
});
```

## Methods
This is a static HTML file and contains no methods or functions.

## Useful details
*   **`data-cy-root`**: This custom data attribute is a testing best practice. It provides a stable and explicit hook for Cypress to find the application's root container, preventing tests from breaking if other elements are added to the `<body>`.
*   **Minimal Structure**: The file is intentionally barebones to ensure that components are tested in a clean, isolated environment without interference from other page elements or styles.