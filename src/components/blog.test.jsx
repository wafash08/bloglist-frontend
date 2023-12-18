import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { test, expect, jest } from '@jest/globals';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

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
	username: 'wafi',
};

test('renders content', () => {
	render(<Blog blog={blog} user={user} />);

	const title = screen.getByText(blog.title);
	const author = screen.getByText(blog.author);
	expect(title).toBeDefined();
	expect(author).toBeDefined();
});

test("shows blog's URL and number of likes", async () => {
	render(<Blog blog={blog} user={user} />);
	const userEventSetup = userEvent.setup();
	const button = screen.getByText('view');
	await userEventSetup.click(button);

	const url = screen.getByText(blog.url);
	const likes = screen.getByText(blog.likes);
	expect(url).toBeDefined();
	expect(likes).toBeDefined();
});

test('ensures that like button is clicked twice', async () => {
	const mockHandler = jest.fn();
	render(<Blog blog={blog} user={user} onUpdateLikesTo={mockHandler} />);
	const userEventSetup = userEvent.setup();
	const button = screen.getByText('view');
	await userEventSetup.click(button);
	const likeButton = screen.getByText('like');
	await userEventSetup.click(likeButton);
	await userEventSetup.click(likeButton);

	expect(mockHandler.mock.calls).toHaveLength(2);
});
