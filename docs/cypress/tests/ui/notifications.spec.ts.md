This Cypress test file, `notifications.spec.ts`, validates the application's notification system.

One test confirms a user receives a specific payment request notification. It involves switching users, clicking the notifications link, and asserting the list contains the expected text.

Another test, "renders an empty notifications state," uses `cy.intercept` to mock a `GET /notifications` API call with an empty array. It then navigates to the notifications page and asserts that an "empty list" message is displayed and the actual list element does not exist. Visual snapshots are captured to prevent UI regressions.

**Keywords**: notifications, intercept, empty state, assertion, visual snapshot, payment request, user interaction, UI, `getBySel`