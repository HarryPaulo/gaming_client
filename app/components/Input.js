import React from 'react';
import PropTypes from 'prop-types';
// import '../css/Login.css';
import '../app.global.css';
import { MdVisibility } from 'react-icons/md';

const Input = (props) => {

	let iconVisibility = null;

	if (props.type === 'password') {
		iconVisibility = (
			<MdVisibility className='iconVisibility' />
		);
	}

	return ( 
		// } props.bolErro === 'signIn' ? 'red' : ''
		<div className={props.EmptyField ? 'Input emptyField' : 'Input'}>
			<input
				id={props.name}
				autoComplete="false"
				required
				type={props.type}
				placeholder={props.placeholder}
				onChange={props.onChange}
			/>
			{iconVisibility}
		</div>
	);
}

Input.propTypes = {
	id: PropTypes.string,
	type: PropTypes.string,
	placeholer: PropTypes.string,
	onChange: PropTypes.func,
	EmptyField: PropTypes.bool
};


export default Input;