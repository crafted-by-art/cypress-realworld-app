**Test Suite Title:** Comments API

This file tests the comments API endpoints. Before each test, it seeds the database, logs in a user via an API call (`cy.loginByApi`), and retrieves a transaction ID using a custom `cy.database` command. It then tests fetching comments for a transaction with a `GET` request to `/comments/:transactionId`, asserting a 200 status and a non-empty comment array. It also tests creating a new comment with a `POST` request to the same endpoint, asserting a 200 status on success.

**Keywords**: API Testing, Comments, cy.request, GET /comments, POST /comments, Assertions, Database Seeding, Authentication, Transaction.