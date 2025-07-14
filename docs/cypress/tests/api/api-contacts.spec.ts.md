```markdown
# api-contacts.spec.ts

## Overview
The `api-contacts.spec.ts` file contains automated end-to-end test cases for the Contacts API of a web application using the Cypress testing framework. It tests various endpoints related to contacting operations, such as fetching, creating, and deleting contacts. This ensures that the contact-related functionalities of the application work as expected and helps in maintaining the reliability and integrity of the service in the development process.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Methods](#methods)
4. [Useful details](#useful-details)

## Prerequisites
- A server running and accessible at the base URL specified by the `apiUrl` environment variable.
- Cypress installed in the development environment to run the test cases.

## Usage
Instantiate the tests by navigating to the project directory and running the Cypress test runner. Typically you would do this with:
```bash
npx cypress open
```
Or for headless test execution:
```bash
npx cypress run
```

Ensure your server is running before executing these tests.

## Methods
- **GET /contacts/:username**: Verifies that a user can retrieve their contact list using their username. The test expects a 200 HTTP status and checks for a `userId` within the response.
- **POST /contacts**: Tests the contact creation functionality. It validates the response to ensure a contact is properly created and returns expected fields.
- **POST /contacts** (with invalid data): Ensures that the system returns a 422 error code when a request with an invalid contact ID is made.
- **DELETE /contacts/:contactId**: Tests if a contact can be successfully deleted, validating a 200 HTTP status in response.

## Useful details
- Before each test, the database is seeded, providing a consistent starting state for tests.
- Utilizes Cypress's ability to interact with the database and authentication system to set up test data and contexts efficiently.
```