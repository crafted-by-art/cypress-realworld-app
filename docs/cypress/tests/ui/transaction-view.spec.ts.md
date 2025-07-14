**Suite Title**: Transaction View

**Description**: This suite tests the single transaction detail page. A `beforeEach` hook seeds the database, intercepts multiple GET and PATCH API endpoints for transactions, and logs in a user. Individual tests verify user interactions: liking a transaction and asserting the like count updates; adding comments and asserting they appear. It also tests core functionality by accepting or rejecting a transaction request, asserting the API call succeeds (status 204), and the action buttons disappear. A final test confirms these buttons are not present on already completed transactions.

**Key Commands**: `cy.task`, `cy.intercept`, `cy.database`, `cy.getBySelLike`, `cy.click`, `.should()`, `cy.visualSnapshot`.

**Fixtures**: Data is seeded and queried directly from the database using `cy.task("db:seed")` and `cy.database("find", ...)`.

**Keywords**: transaction, like, comment, accept request, reject request, API intercept, visual regression, UI assertions.