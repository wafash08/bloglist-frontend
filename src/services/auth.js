import axios from 'axios';
const loginUrl = '/api/login';

export async function login({ username, password }) {
	const request = await axios.post(loginUrl, { username, password });
	const response = await request.data;
	return response.data;
}
