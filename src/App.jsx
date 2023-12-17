import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import { create, getAll, setToken } from './services/blogs';
import { login } from './services/auth';

function CreateNewBlogForm({ onCreateNewBlog }) {
	const [blog, setBlog] = useState({ title: '', author: '', url: '' });

	const handleCreateBlog = async e => {
		e.preventDefault();
		try {
			const newBlog = await create(blog);
			onCreateNewBlog(newBlog);
			setBlog({
				title: '',
				author: '',
				url: '',
			});
		} catch (error) {
			console.log(error);
		}
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
				/>
			</div>
			<button type='submit'>create</button>
		</form>
	);
}

function LoginForm({ onLogin }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async e => {
		e.preventDefault();
		const loggedInUser = await login({ username, password });
		onLogin(loggedInUser);
	};

	return (
		<>
			<h2>Log in to application</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor='username'>username</label>
					<input
						type='text'
						name='username'
						id='username'
						value={username}
						onChange={e => setUsername(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor='password'>password</label>
					<input
						type='password'
						name='password'
						id='password'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</div>
				<button type='submit'>login</button>
			</form>
		</>
	);
}

function App() {
	const [user, setUser] = useState(null);
	const [blogs, setBlogs] = useState([]);

	const LS_BLOGLIST_USER = 'loggedBloglistUser';

	useEffect(() => {
		async function getAllBlogs() {
			const blogs = await getAll();
			setBlogs(blogs);
		}
		getAllBlogs();
	}, []);

	useEffect(() => {
		const loggedInUser = window.localStorage.getItem(LS_BLOGLIST_USER);
		if (loggedInUser) {
			const user = JSON.parse(loggedInUser);
			setUser(user);
			setToken(user.token);
		}
	}, []);

	const handleLogin = loggedInUser => {
		setUser(loggedInUser);
		window.localStorage.setItem(
			LS_BLOGLIST_USER,
			JSON.stringify(loggedInUser)
		);
		setToken(loggedInUser.token);
	};

	const handleLogout = () => {
		setUser(null);
		window.localStorage.removeItem(LS_BLOGLIST_USER);
	};

	const createNewBlog = newBlog => {
		setBlogs([...blogs, newBlog]);
	};

	return (
		<div>
			{user === null ? (
				<LoginForm onLogin={handleLogin} />
			) : (
				<>
					<h2>blogs</h2>
					<p>
						<span>{user.name} logged in</span>
						<button type='button' onClick={handleLogout}>
							logout
						</button>
					</p>
					<CreateNewBlogForm onCreateNewBlog={createNewBlog} />
					{blogs.map(blog => (
						<Blog key={blog.id} blog={blog} />
					))}
				</>
			)}
		</div>
	);
}

export default App;
