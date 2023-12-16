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
		console.log('loggedInUser >> ', loggedInUser);
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

	useEffect(() => {
		blogService.getAll().then(blogs => setBlogs(blogs));
	}, []);

	const handleLogin = loggedInUser => {
		setUser(loggedInUser);
	};

	console.log('user >> ', user);

	return (
		<div>
			{user === null ? (
				<LoginForm onLogin={handleLogin} />
			) : (
				<>
					<h2>blogs</h2>
					<h3>{user.name} logged in</h3>
					{blogs.map(blog => (
						<Blog key={blog.id} blog={blog} />
					))}
				</>
			)}
		</div>
	);
}

export default App;
