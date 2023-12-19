/* eslint-disable no-mixed-spaces-and-tabs */
import { useState } from 'react';
import PropTypes from 'prop-types';
import Blog from './Blog';
import { LS_BLOGLIST_USER } from '../App';

export default function Bloglist({ blogs, onRemoveBlogBy, onUpdateLikesTo }) {
	const [sortBy, setSortBy] = useState('desc');
	const userFromLocalStorage = useState(() =>
		JSON.parse(window.localStorage.getItem(LS_BLOGLIST_USER))
	);

	let sortedBlogs =
		sortBy === 'asc'
			? blogs.sort((a, b) => a.likes - b.likes)
			: blogs.sort((a, b) => b.likes - a.likes);

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
			<button
				type='button'
				onClick={sortByLikes}
				data-test='sortbylikes_button'
			>
				sort by likes "{sortBy}" (
				{sortBy === 'asc' ? 'least to most' : 'most to least'})
			</button>
			<ul className='bloglist'>
				{sortedBlogs.map(blog => (
					<Blog
						key={blog.id}
						blog={blog}
						onRemoveBlogBy={onRemoveBlogBy}
						onUpdateLikesTo={onUpdateLikesTo}
						user={userFromLocalStorage[0]}
					/>
				))}
			</ul>
		</>
	);
}

Bloglist.propTypes = {
	blogs: PropTypes.array.isRequired,
	onRemoveBlogBy: PropTypes.func.isRequired,
	onUpdateLikesTo: PropTypes.func.isRequired,
};
