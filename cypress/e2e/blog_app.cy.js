describe('Blog app', function () {
	// must empty the database
	beforeEach(function () {
		cy.request('POST', 'http://localhost:8080/api/testing/reset');
		cy.visit('http://localhost:5173');
	});

	it('Login form is shown', function () {
		cy.contains('Log in to application');
		cy.get('[data-cy="username"]');
		cy.get('[data-cy="password"]');
		cy.get('[data-cy="login"]');
	});
});
