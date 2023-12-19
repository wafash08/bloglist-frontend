export default function Notification({ notification }) {
	const { message, type } = notification;
	const baseStyles = {
		fontSize: '20px',
		borderRadius: '5px',
		backgroundColor: 'lightgray',
		padding: '0.5rem',
		borderStyle: 'solid',
	};

	let styles;
	switch (type) {
		case 'success': {
			styles = { ...baseStyles, color: 'green' };
			break;
		}
		case 'error': {
			styles = { ...baseStyles, color: 'red' };
			break;
		}
		default: {
			styles = baseStyles;
			break;
		}
	}

	if (message === null) {
		return null;
	}
	return (
		<p style={styles} data-test='alert'>
			{message}
		</p>
	);
}
