**Test Suite:** Contacts API

This spec tests the backend "Contacts API" endpoints. A `beforeEach` hook prepares the state by seeding the database (`cy.task("db:seed")`), fetching user/contact data (`cy.database`), and authenticating (`cy.loginByApi`). Tests use `cy.request` to perform GET, POST, and DELETE actions on `/contacts`. Assertions (`expect`) validate response status codes (200, 422) and body content, ensuring correct retrieval, creation (including invalid data error handling), and deletion of contacts.

**Keywords:** API testing, Contacts API, cy.request, GET /contacts, POST /contacts, DELETE /contacts, db:seed, authentication, cy.database, assertions.