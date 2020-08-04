import React from 'react';
import propTypes from 'prop-types';
import '../app.global.css';

import { MdArrowForward } from 'react-icons/md';
import { FaGooglePlus, FaTwitter, FaFacebook } from 'react-icons/fa';

const SubmitButton = (props) => {

	let socialNets = null;
	if (props.type === 'signIn') {
		socialNets = (
			<div className='socialNets'>
				<FaGooglePlus className='socialNetsIcon' />
				<FaTwitter className='socialNetsIcon' />
				<FaFacebook className='socialNetsIcon' />
			</div>
		)
	} else {
		socialNets = (
			<div className='socialNets'>
			</div>
		)
	}

	return (
		<div className={'submitButton'}>
			{socialNets}
			<button className={props.type === 'signIn' ? 'submitSignIn' : 'submitSignUp'} onClick={props.onClick}>
				<MdArrowForward />
			</button>
		</div>
	);

}

SubmitButton.propTypes = {
	type: propTypes.string,
	onClick: propTypes.func
};


export default SubmitButton;