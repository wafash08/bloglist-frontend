import { useState } from 'react';

export default function Blog({ blog, onRemoveBlogBy, onUpdateLikesTo, user }) {
	const [showDetails, setShowDetails] = useState(false);
	const [like, setLike] = useState(blog.likes);

	const showDeleteButton = blog.user.name === user.name;

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
		<div style={styles} className='blog'>
			<div>
				<span>{blog.title}</span>
				<span>{blog.author}</span>
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
