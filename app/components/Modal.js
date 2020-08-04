import React, { Component } from 'react';
import '../app.global.css';
import Sign from './Sign';
import SignExpanded from './SignExpanded';
import SignCollapsed from './SignCollapsed';

// import startGame from '../electron-starter';
// import soFetch from '../lib/soFetch.js';


class Modal extends Component {

	constructor(props) {
		super(props);
		this.state = {
			wasClickedLeft: false,
			wasClickedRight: false,
		};
	}

	componentWillMount = () => {
		// this.props.history.push('/');
	}

	onReset = () => {
		this.setState({
			wasClickedLeft: false,
			wasClickedRight: false
		})
	}

	onClickLeft = () => {
		this.setState({ wasClickedLeft: !this.state.wasClickedLeft }, function () {
			if (this.state.wasClickedRight === true && this.state.wasClickedLeft === true) {
				this.setState({ wasClickedRight: false });
			};
		});
	}

	userLogged = () => {
		this.props.history.push('/GamesList'); 
	}

	onClickRight = (e) => {
		//e.preventDefault();
		this.props.history.push('/GamesList'); 
		console.log(this.props.history);

		this.setState({ wasClickedRight: !this.state.wasClickedRight }, function () {
			if (this.state.wasClickedRight === true && this.state.wasClickedLeft === true) {
				this.setState({ wasClickedLeft: false });
			};
		});
	}

	render() {
		let modalContent = null;
		console.log(this.props);

		if (this.state.wasClickedLeft === false && this.state.wasClickedRight === false) {
			modalContent = (
				<div className='Modal'>
					<Sign type='signIn' onChange={this.onClickLeft}></Sign>
					<Sign type='signUp' onChange={this.onClickRight}></Sign>
				</div>
			);
		} else if (this.state.wasClickedLeft === false && this.state.wasClickedRight === true) {
			modalContent = (
				<div className='Modal'>
					<SignCollapsed type='signIn' onChange={this.onClickLeft}></SignCollapsed>
					<SignExpanded type='signUp' ></SignExpanded>
				</div>
			);
		} else if (this.state.wasClickedLeft === true && this.state.wasClickedRight === false) {
			modalContent = (
				<div className='Modal'>
					<SignExpanded type='signIn' userLogged={this.userLogged}></SignExpanded>
					<SignCollapsed type='signUp' onChange={this.onClickRight}></SignCollapsed>
				</div>
			);
		}

		return (
			<div className="Modal">
				{modalContent}
			</div>
		);
	}

}

export default Modal;