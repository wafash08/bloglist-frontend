describe('Blog app', function () {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:8080/api/testing/reset');
		const user_john = {
			name: 'John Dalton',
			username: 'johndalton',
			password: '1234',
		};
		cy.request('POST', 'http://localhost:8080/api/users/', user_john);
		const user_einstein = {
			name: 'Albert Einstein',
			username: 'alberteinstein',
			password: '1234',
		};
		cy.request('POST', 'http://localhost:8080/api/users/', user_einstein);
		cy.visit('http://localhost:5173');
	});

	it('Login form is shown', function () {
		cy.contains('Log in to application');
		cy.get('[data-test="username"]');
		cy.get('[data-test="password"]');
		cy.get('[data-test="login_button"]');
	});

	describe('Login', function () {
		it('succeeds with correct credentials', function () {
			cy.get('[data-test="username"]').type('johndalton');
			cy.get('[data-test="password"]').type('1234');
			cy.get('[data-test="login_button"]').click();
			cy.contains('John Dalton logged in');
		});

		it('fails with wrong credentials and shows notification with red color', function () {
			cy.get('[data-test="username"]').type('wrongusername');
			cy.get('[data-test="password"]').type('wrongpassword');
			cy.get('[data-test="login_button"]').click();

			// cy.get('[data-cy="alert"]').should(
			// 	'contain',
			// 	'username or password is wrong'
			// );
			// cy.get('[data-cy="alert"]').should('have.css', 'color', 'rgb(255, 0, 0)');
			cy.get('[data-test="alert"]')
				.should('contain', 'username or password is wrong')
				.and('have.css', 'color', 'rgb(255, 0, 0)')
				.and('have.css', 'border-style', 'solid');

			cy.get('html').should('not.contain', 'John Dalton logged in');
		});
	});

	describe('When logged in', function () {
		beforeEach(function () {
			cy.login({ username: 'johndalton', password: '1234' });
		});

		it('A blog can be created', function () {
			cy.get('[data-test="togglable_button"]').click();

			cy.get('[data-test="title"]').type('CSS Variables for React Devs');
			cy.get('[data-test="author"]').type('Josh Comeau');
			cy.get('[data-test="url"]').type(
				'https://www.joshwcomeau.com/css/css-variables-for-react-devs/'
			);
			cy.get('[data-test="create"]').click();

			cy.get('[data-test="blog"]').should(
				'contain',
				'CSS Variables for React Devs Josh Comeau'
			);
		});

		describe('there is a blog', function () {
			beforeEach(function () {
				cy.createBlog({
					title: 'CSS Variables for React Devs',
					author: 'Josh Comeau',
					url: 'https://www.joshwcomeau.com/css/css-variables-for-react-devs/',
				});
			});

			it('users can like a blog', function () {
				cy.get('[data-test="view_hide_button"').click();
				cy.get('[data-test="like_button"').as('like_button');
				cy.get('@like_button').click();
				cy.get('@like_button').parent().find('span').should('contain', '1');
			});

			it('users can remove their blog', function () {
				cy.get('[data-test="view_hide_button"').click();
				cy.get('[data-test="remove_button"').click();
				cy.contains('CSS Variables for React Devs Josh Comeau').should(
					'not.exist'
				);
			});
		});

		describe.only('there are users', function () {
			beforeEach(function () {
				// john logs out
				cy.get('[data-test="logout_button"]').click();
				// einstein logs in
				cy.login({
					username: 'alberteinstein',
					password: '1234',
				});
				// ensure that einstein has logged in
				cy.contains('Albert Einstein logged in');
			});

			it('ensures that only the creator can see the remove button of a blog', function () {
				// einstein creates new blog
				cy.createBlog({
					title: 'Common Beginner Mistakes with React',
					author: 'Josh Comeau',
					url: 'https://www.joshwcomeau.com/react/common-beginner-mistakes/',
				});
				// einstein logs out
				cy.get('[data-test="logout_button"]').click();
				// john logs in
				cy.login({
					username: 'johndalton',
					password: '1234',
				});
				// john can not see the remove button
				cy.get('[data-test="view_hide_button"').click();
				cy.get('[data-test="remove_button"').should('not.exist');
			});

			it('check that the blogs are ordered according to likes', function () {
				cy.createBlog({
					title: 'Common Beginner Mistakes with React',
					author: 'Josh Comeau',
					url: 'https://www.joshwcomeau.com/react/common-beginner-mistakes/',
				});
				cy.createBlog({
					title: 'CSS Variables for React Devs',
					author: 'Josh Comeau',
					url: 'https://www.joshwcomeau.com/css/css-variables-for-react-devs/',
				});

				cy.contains('CSS Variables for React Devs')
					.parent()
					.find('[data-test="view_hide_button"]')
					.click();
				cy.get('[data-test="like_button"]').click();

				cy.get('[data-test="sortbylikes_button"]').click(); // sort asc (least to most)
				cy.get('[data-test="blog"]')
					.eq(0)
					.should('contain', 'Common Beginner Mistakes with React');
				cy.get('[data-test="blog"]')
					.eq(1)
					.should('contain', 'CSS Variables for React Devs');

				cy.get('[data-test="sortbylikes_button"]').click(); // sort desc (most to least)
				cy.get('[data-test="blog"]')
					.eq(0)
					.should('contain', 'CSS Variables for React Devs');
				cy.get('[data-test="blog"]')
					.eq(1)
					.should('contain', 'Common Beginner Mistakes with React');
			});
		});
	});
});
