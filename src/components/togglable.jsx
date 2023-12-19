import { useState, forwardRef, useImperativeHandle } from 'react';

const Togglable = forwardRef(({ buttonLable, children }, ref) => {
	const [visible, setVisible] = useState(false);

	const hideWhenVisible = { display: visible ? 'none' : 'block' };
	const showWhenVisible = { display: visible ? 'block' : 'none' };

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	useImperativeHandle(ref, () => {
		return { toggleVisibility };
	});

	return (
		<div>
			<div style={hideWhenVisible}>
				<button
					type='button'
					onClick={toggleVisibility}
					data-test='togglable_button'
				>
					{buttonLable}
				</button>
			</div>
			<div style={showWhenVisible}>
				{children}
				<button type='button' onClick={toggleVisibility}>
					cancel
				</button>
			</div>
		</div>
	);
});

Togglable.displayName = 'Togglable';

export default Togglable;
