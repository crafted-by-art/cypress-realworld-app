# config.yml
## Overview
This file is a CircleCI configuration that defines a Continuous Integration (CI) pipeline. Its primary purpose is to automate the building, testing, and validation of a web application. The pipeline includes steps for installing dependencies, running linters and unit tests, and executing a comprehensive suite of Cypress tests (component, API, and end-to-end) in parallel across different browsers and viewports.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Methods](#methods)
4. [Useful details](#properties)
## Prerequisites
This configuration relies on the CircleCI platform and the following CircleCI Orbs (reusable packages of configuration):

*   `cypress-io/cypress@4.0.0`: Provides commands and jobs for running Cypress tests.
*   `codecov/codecov@5.3.0`: Provides commands for uploading code coverage reports to Codecov.

The project is expected to be a `yarn`-based Node.js application with scripts defined in `package.json` for building, linting, and testing (e.g., `yarn build:ci`, `yarn test:unit:ci`, `yarn cypress`).

## Usage
This file must be located at `.circleci/config.yml` in the root of the project repository. CircleCI automatically detects this file and executes the defined workflows when code is pushed to the repository.

```bash
# Project structure example
.
├── .circleci/
│   └── config.yml  <-- This file
├── cypress/
├── src/
├── package.json
└── yarn.lock
```

The primary workflow, `linux`, will be triggered, orchestrating all the defined jobs.

## Methods
This configuration defines reusable `commands`, which are orchestrated by `jobs` within a `workflow`. Key components include:

### Commands
*   **`setup_project_and_cypress`**: A command that prepares the environment for testing. It installs dependencies using `yarn`, builds the project, runs static analysis (linting, type checking), and executes unit tests. It persists the project files and Cypress cache to a workspace to be used by subsequent jobs.

*   **`cypress_tests`**: A parameterized command for running various Cypress test suites.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `browser` | string | The browser to run tests on (e.g., `chrome`, `firefox`). |
| `specPattern` | string | A glob pattern to select specific test files to run. |
| `ciBuildId` | string | A unique ID for the CI run, used to group parallel tests. |
| `group` | string | A name for the test group in the Cypress Dashboard. |
| `isMobile` | boolean | If `true`, runs tests with a mobile viewport. |
| `isComponent` | boolean | If `true`, runs Cypress component tests. |
| `recordPercy` | boolean | If `true`, wraps the test run with Percy for visual testing. |

### Workflows
*   **`linux`**: The main workflow that orchestrates the entire CI pipeline.
    1.  It first runs the `setup_project_and_cypress_linux` job to build and prepare the application.
    2.  Once setup is complete, it triggers multiple `cypress_tests_linux` jobs in parallel. Each job is configured with different parameters to test various aspects of the application:
        *   Component Tests
        *   API Tests
        *   UI Tests on Chrome (desktop and mobile)
        *   UI Tests on Firefox (desktop and mobile)

## Useful details
*   **Parallelism**: The `cypress_tests_linux` job is configured with `parallelism: 5`. This allows CircleCI to spin up five separate environments to run the test suite simultaneously, significantly reducing the total execution time.
*   **Workspace Persistence**: The configuration uses `persist_to_workspace` and `attach_workspace` to share data between jobs. The initial `setup` job builds the project and installs dependencies once, and the results are passed to all subsequent testing jobs, avoiding redundant work.
*   **Third-Party Integrations**: The pipeline is integrated with external services to enhance testing and reporting:
    *   **Cypress Dashboard**: Test results, recordings, and parallelization are managed via the Cypress Dashboard.
    *   **Codecov**: After tests run, coverage reports are generated and uploaded to Codecov for analysis.
    *   **Percy**: Visual regression testing is performed for specific UI test runs using Percy.
*   **Custom Executor**: A custom Docker executor named `with-chrome-and-firefox` is defined to use a specific Cypress image (`cypress/browsers:22.16.0`) that contains all the necessary browsers and dependencies for running the tests.