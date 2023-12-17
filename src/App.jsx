import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import { create, getAll, setToken } from './services/blogs';
import { login } from './services/auth';

function Notification({ notification }) {
	const { message, type } = notification;
	const baseStyles = {
		fontSize: '20px',
		borderRadius: '5px',
		backgroundColor: 'lightgray',
		padding: '0.5rem',
		borderStyle: 'solid',
	};

	let styles;
	switch (type) {
		case 'success': {
			styles = { ...baseStyles, color: 'green' };
			break;
		}
		case 'error': {
			styles = { ...baseStyles, color: 'red' };
			break;
		}
	}

	if (message === null) {
		return null;
	}
	return <p style={styles}>{message}</p>;
}

function CreateNewBlogForm({ onCreateNewBlog }) {
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

	const handleSubmit = e => {
		e.preventDefault();
		onLogin({ username, password });
	};

	return (
		<>
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
	const [notification, setNotification] = useState({
		message: null,
		type: null,
	});

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

	const handleLogin = async ({ username, password }) => {
		try {
			const loggedInUser = await login({ username, password });
			setUser(loggedInUser);
			window.localStorage.setItem(
				LS_BLOGLIST_USER,
				JSON.stringify(loggedInUser)
			);
			setToken(loggedInUser.token);
		} catch (error) {
			console.log(error);
			setNotification({
				message: error.response.data.error,
				type: 'error',
			});
			setTimeout(() => {
				setNotification({ message: null, type: null });
			}, 2500);
		}
	};

	const handleLogout = () => {
		setUser(null);
		window.localStorage.removeItem(LS_BLOGLIST_USER);
	};

	const createNewBlog = async blog => {
		try {
			const newBlog = await create(blog);
			setBlogs([...blogs, newBlog]);
			setNotification({
				message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
				type: 'success',
			});
			setTimeout(() => {
				setNotification({ message: null, type: null });
			}, 2500);
		} catch (error) {
			console.log(error);
			setNotification({
				message: error.response.data.error,
				type: 'error',
			});
			setTimeout(() => {
				setNotification({ message: null, type: null });
			}, 2500);
		}
	};

	return (
		<div>
			{user === null ? <h2>Log in to application</h2> : <h2>blogs</h2>}
			<Notification notification={notification} />
			{user === null ? (
				<LoginForm onLogin={handleLogin} />
			) : (
				<>
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
