import { useState } from 'react';
import { addLikeTo, remove } from '../services/blogs';
import { LS_BLOGLIST_USER } from '../App';

export default function Bloglist({ blogs, onRemoveBlogBy, onUpdateLikesTo }) {
	const [sortBy, setSortBy] = useState('asc');

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
				/>
			))}
		</>
	);
}

function Blog({ blog, onRemoveBlogBy, onUpdateLikesTo }) {
	const [showDetails, setShowDetails] = useState(false);
	const [like, setLike] = useState(blog.likes);
	const [userFromLocalStorage, _] = useState(() =>
		JSON.parse(window.localStorage.getItem(LS_BLOGLIST_USER))
	);

	const showDeleteButton = blog.user.name === userFromLocalStorage.name;

	const styles = {
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 10,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	};

	const handleLike = async () => {
		setLike(like + 1);
		const updatedBlog = {
			...blog,
			likes: like + 1,
		};
		onUpdateLikesTo(blog.id, updatedBlog);
	};

	const handleRemoveBlogBy = async () => {
		const hasConfirmation = window.confirm(
			`Remove blog ${blog.title} by ${blog.author}?`
		);
		if (!hasConfirmation) {
			return;
		}
		onRemoveBlogBy(blog.id);
	};

	return (
		<div style={styles}>
			<div>
				<span>
					{blog.title} {blog.author}
				</span>
				<button type='button' onClick={() => setShowDetails(!showDetails)}>
					{showDetails ? 'hide' : 'view'}
				</button>
			</div>
			{showDetails ? (
				<div>
					<p>{blog.url}</p>
					<p>
						<span>{like}</span>
						<button type='button' onClick={handleLike}>
							like
						</button>
					</p>
					<p>{blog.user.name}</p>
					{showDeleteButton ? (
						<button type='button' onClick={handleRemoveBlogBy}>
							remove
						</button>
					) : null}
				</div>
			) : null}
		</div>
	);
}
