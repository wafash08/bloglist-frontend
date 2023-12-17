import axios from 'axios';
const baseUrl = '/api/blogs';

export async function getAll() {
	const request = await axios.get(baseUrl);
	const response = await request.data;
	return response.data;
}

let token = null;

export function setToken(newToken) {
	token = `Bearer ${newToken}`;
}

export async function create(newBlog) {
	const request = await axios.post(baseUrl, newBlog, {
		headers: { Authorization: token },
	});
	const response = await request.data;
	return response.data;
}
