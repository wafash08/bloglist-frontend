/* eslint-disable no-mixed-spaces-and-tabs */
import { useState } from 'react';
import PropTypes from 'prop-types';
import Blog from './Blog';
import { LS_BLOGLIST_USER } from '../App';

export default function Bloglist({ blogs, onRemoveBlogBy, onUpdateLikesTo }) {
	const [sortBy, setSortBy] = useState('asc');
	const userFromLocalStorage = useState(() =>
		JSON.parse(window.localStorage.getItem(LS_BLOGLIST_USER))
	);

	let sortedBlogs =
		sortBy === 'asc'
			? blogs.sort((a, b) => {
					return b.likes - a.likes;
			  })
			: blogs.sort((a, b) => {
					return a.likes - b.likes;
			  });

	const sortByLikes = () => {
		switch (sortBy) {
			case 'asc': {
				setSortBy('desc');
				break;
			}

			case 'desc': {
				setSortBy('asc');
				break;
			}
		}
	};

	return (
		<>
			<button type='button' onClick={sortByLikes}>
				sort by likes {sortBy === 'asc' ? '⬆️' : '⬇️'}
			</button>
			{sortedBlogs.map(blog => (
				<Blog
					key={blog.id}
					blog={blog}
					onRemoveBlogBy={onRemoveBlogBy}
					onUpdateLikesTo={onUpdateLikesTo}
					user={userFromLocalStorage[0]}
				/>
			))}
		</>
	);
}

Bloglist.propTypes = {
	blogs: PropTypes.array.isRequired,
	onRemoveBlogBy: PropTypes.func.isRequired,
	onUpdateLikesTo: PropTypes.func.isRequired,
};
