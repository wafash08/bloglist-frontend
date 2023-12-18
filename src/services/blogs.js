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

export async function addLikeTo(id, blog) {
	const request = await axios.put(`${baseUrl}/${id}`, blog);
	const response = await request.data;
	return response.data;
}

export async function remove(id) {
	const request = await axios.delete(`${baseUrl}/${id}`, {
		headers: { Authorization: token },
	});
	const response = request.data;
	return response.data;
}
