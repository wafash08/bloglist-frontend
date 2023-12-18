import { useState } from 'react';

export default function Blog({ blog }) {
	const [showDetails, setShowDetails] = useState(false);

	const styles = {
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 10,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	};

	console.log('blog >> ', blog);

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
						<span>{blog.likes}</span>
						<button type='button'>like</button>
					</p>
					<p>{blog.user.name}</p>
				</div>
			) : null}
		</div>
	);
}
