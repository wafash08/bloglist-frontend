import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { test, expect } from '@jest/globals';
import Blog from './Blog';

test('renders content', () => {
	const blog = {
		title: 'An Interactive Guide to CSS Grid',
		author: 'Josh Comeau',
		url: 'https://www.joshwcomeau.com/css/interactive-guide-to-grid/',
		likes: 30000,
		user: {
			username: 'wafi',
			name: 'Wafi',
			id: '657a8d04e3b50369283f1878',
		},
		id: '657c8af94ed522c59f25ef50',
	};

	const user = {
		name: 'Super Root',
	};

	render(<Blog blog={blog} user={user} />);

	const title = screen.getByText(blog.title);
	const author = screen.getByText(blog.author);
	expect(title).toBeDefined();
	expect(author).toBeDefined();
});