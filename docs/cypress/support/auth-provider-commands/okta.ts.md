This file defines two custom Cypress commands for Okta authentication.

The `loginByOktaApi` command performs programmatic authentication. It sends a `POST` request to the Okta API using `cy.request` to get a session token, then uses the Okta SDK to fetch an access token, which it stores in `localStorage`.

The `loginByOkta` command performs a UI-based login, wrapped in `cy.session` for caching. It uses `cy.origin` to interact with the Okta domain, types credentials, clicks submit, and asserts the username appears on the page to confirm a successful login.

*   **Keywords**: Okta, authentication, login, `cy.session`, `cy.request`, `cy.origin`, programmatic login, localStorage.