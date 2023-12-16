import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then(response => response.data.data);
};

export default { getAll };
