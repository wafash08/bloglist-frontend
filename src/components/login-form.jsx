import { useState } from 'react';

export default function LoginForm({ onLogin }) {
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
						data-test='username'
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
						data-test='password'
					/>
				</div>
				<button type='submit' data-test='login_button'>
					login
				</button>
			</form>
		</>
	);
}
