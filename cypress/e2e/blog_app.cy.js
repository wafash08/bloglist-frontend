describe('Blog app', function () {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:8080/api/testing/reset');
		const user = {
			name: 'John Dalton',
			username: 'johndalton',
			password: '1234',
		};
		cy.request('POST', 'http://localhost:8080/api/users/', user);
		cy.visit('http://localhost:5173');
	});

	it('Login form is shown', function () {
		cy.contains('Log in to application');
		cy.get('[data-cy="username"]');
		cy.get('[data-cy="password"]');
		cy.get('[data-cy="login"]');
	});

	describe('Login', function () {
		it('succeeds with correct credentials', function () {
			cy.get('[data-cy="username"]').type('johndalton');
			cy.get('[data-cy="password"]').type('1234');
			cy.get('[data-cy="login"]').click();
			cy.contains('John Dalton logged in');
		});

		it('fails with wrong credentials', function () {
			cy.get('[data-cy="username"]').type('wrongusername');
			cy.get('[data-cy="password"]').type('wrongpassword');
			cy.get('[data-cy="login"]').click();
			cy.contains('username or password is wrong');
		});
	});
});
