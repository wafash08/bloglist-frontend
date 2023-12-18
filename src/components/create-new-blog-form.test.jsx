import { test, jest, expect } from '@jest/globals';
import CreateNewBlogForm from './create-new-blog-form';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('ensures that the form calls the event handler it received as props with the right details when a new blog is created', async () => {
	const createNewBlog = jest.fn();
	render(<CreateNewBlogForm onCreateNewBlog={createNewBlog} />);

	// get input elements and submit button
	const titleInput = screen.getByLabelText('title');
	const authorInput = screen.getByLabelText('author');
	const urlInput = screen.getByLabelText('url');
	const createButton = screen.getByText('create');

	// user types on input and clicks the create button
	const user = userEvent.setup();
	await user.type(titleInput, 'judul blog');
	await user.type(authorInput, 'penulis blog');
	await user.type(urlInput, 'https://www.example.com/');
	await user.click(createButton);

	// ensure that createNewBlog only gets called once
	expect(createNewBlog.mock.calls).toHaveLength(1);
	// console.log('createNewBlog mock >> ', createNewBlog.mock.calls[0][0]);
	// ensure that each input has the proper value
	const { title, author, url } = createNewBlog.mock.calls[0][0];
	expect(title).toBe('judul blog');
	expect(author).toBe('penulis blog');
	expect(url).toBe('https://www.example.com/');
});
