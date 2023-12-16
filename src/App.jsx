import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import { login } from './services/auth';

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
		blogService.getAll().then(blogs => setBlogs(blogs));
	}, []);

	useEffect(() => {
		const loggedInUser = window.localStorage.getItem(LS_BLOGLIST_USER);
		if (loggedInUser) {
			const user = JSON.parse(loggedInUser);
			setUser(user);
		}
	}, []);

	const handleLogin = loggedInUser => {
		setUser(loggedInUser);
		window.localStorage.setItem(
			LS_BLOGLIST_USER,
			JSON.stringify(loggedInUser)
		);
	};

	const handleLogout = () => {
		setUser(null);
		window.localStorage.removeItem(LS_BLOGLIST_USER);
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
					{blogs.map(blog => (
						<Blog key={blog.id} blog={blog} />
					))}
				</>
			)}
		</div>
	);
}

export default App;
