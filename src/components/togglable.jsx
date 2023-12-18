import { useState } from 'react';

export default function Togglable({ buttonLable, children }) {
	const [visible, setVisible] = useState(false);

	const hideWhenVisible = { display: visible ? 'none' : 'block' };
	const showWhenVisible = { display: visible ? 'block' : 'none' };

	return (
		<div>
			<div style={hideWhenVisible}>
				<button type='button' onClick={() => setVisible(true)}>
					{buttonLable}
				</button>
			</div>
			<div style={showWhenVisible}>
				{children}
				<button type='button' onClick={() => setVisible(false)}>
					cancel
				</button>
			</div>
		</div>
	);
}
