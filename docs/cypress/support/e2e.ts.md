This Cypress support file configures the test environment before each test using a `beforeEach` hook. It uses `cy.intercept` middleware to modify all API requests, first by removing the `if-none-match` header to disable server caching and ensure fresh data. For mobile viewports, it adds a second interceptor to throttle API responses to 1 Mbps, simulating a slow network connection for more realistic testing conditions.

*   **Test Suite Title**: N/A (Support file)
*   **Key Commands**: `beforeEach`, `cy.intercept`, `res.setThrottle`
*   **Fixtures**: N/A
*   **Keywords**: `cy.intercept`, `caching`, `if-none-match`, `throttle`, `network simulation`, `mobile testing`, `API requests`, `middleware`