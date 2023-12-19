import { useState } from 'react';

export default function CreateNewBlogForm({ onCreateNewBlog }) {
	const [blog, setBlog] = useState({ title: '', author: '', url: '' });

	const handleCreateBlog = e => {
		e.preventDefault();
		onCreateNewBlog(blog);
		setBlog({
			title: '',
			author: '',
			url: '',
		});
	};

	return (
		<form onSubmit={handleCreateBlog}>
			<div>
				<label htmlFor='title'>title</label>
				<input
					type='text'
					id='title'
					name='title'
					value={blog.title}
					onChange={e => setBlog({ ...blog, title: e.target.value })}
					data-test='title'
				/>
			</div>
			<div>
				<label htmlFor='author'>author</label>
				<input
					type='text'
					id='author'
					name='author'
					value={blog.author}
					onChange={e => setBlog({ ...blog, author: e.target.value })}
					data-test='author'
				/>
			</div>
			<div>
				<label htmlFor='url'>url</label>
				<input
					type='url'
					id='url'
					name='url'
					value={blog.url}
					onChange={e => setBlog({ ...blog, url: e.target.value })}
					data-test='url'
				/>
			</div>
			<button type='submit' data-test='create'>
				create
			</button>
		</form>
	);
}
