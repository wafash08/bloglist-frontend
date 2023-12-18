import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/notification';
import LoginForm from './components/login-form';
import Togglable from './components/togglable';
import CreateNewBlogForm from './components/create-new-blog-form';
import { create, getAll, setToken } from './services/blogs';
import { login } from './services/auth';

export default function App() {
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
					<Togglable buttonLable={'create new blog'}>
						<CreateNewBlogForm onCreateNewBlog={createNewBlog} />
					</Togglable>
					{blogs.map(blog => (
						<Blog key={blog.id} blog={blog} />
					))}
				</>
			)}
		</div>
	);
}
