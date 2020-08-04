import React, { Component } from 'react';
import propTypes from 'prop-types';
import '../app.global.css';
import { Motion, spring } from 'react-motion';
import Input from './Input';
import SubmitButton from './SubmitButton';
import autoBind from 'react-autobind';
import soFetch from '../lib/soFetch.js';
import skt from '../lib/socket.js';

class SignExpanded extends Component {

	constructor(props) {
		super(props);
		autoBind(this);
		this.state = {
			flexState: false,
			animIsFinished: false,
			user: '',
			pass: '',
			email: '',
			validacao: '',
			errors: {
				username: false,
				password: false,
				email: false,
			},
		};

	}

	componentDidMount() {
		this.setState({ flexState: !this.state.flexState });
	}

	isFinished = () => {
		this.setState({ animIsFinished: true });
	}

	validate = (user, pass, email) => {
		return {
			username: user.length === 0,
			password: pass.length === 0,
			email: email.length === 0,
		};
	}

	onLogin = (e) => {
		e.preventDefault();

		this.setState({ errors: this.validate(this.state.user, this.state.pass, 'Valid') });
		if (this.state.user.length === 0 || this.state.pass.length === 0) {
			this.setState({ validacao: 'Esses campos são obrigatórios.' });
		} else {
			soFetch.post('/login', { login: this.state.user, pass: this.state.pass }).then((res) => {
				if (!res.isEmpty) {
					localStorage.setItem('idUsuario', res.id_user);
					localStorage.setItem('login', res.login);
					//					localStorage.setItem('token', res[0].);  -- TODO

					skt.getSkt().emit('login', { userid: res.id_user, username: res.login })
					this.setState({ validacao: '' });
					this.props.userLogged();
				} else {
					this.setState({ validacao: 'Usuário ou senha inválido' });
				}
			});
		}
	}

	onCadastro = (e) => {
		e.preventDefault();
		console.log(this.props);

		// this.setState({ errors: this.validate(this.state.user, this.state.pass, this.state.email) });
		// if (this.state.user.length === 0 || this.state.pass.length === 0 || this.state.email.length === 0) {
		// 	this.setState({ validacao: 'This field is required.' });
		// }
	}

	render() {
		return (
			<Motion style={{
				flexVal: spring(this.state.flexState ? 8 : 1)
			}} onRest={this.isFinished}>
				{({ flexVal }) =>
					<div className={this.props.type === 'signIn' ? 'signInExpanded' : 'signUpExpanded'} style={{
						flexGrow: `${flexVal}`
					}}>
						<Motion style={{
							opacity: spring(this.state.flexState ? 1 : 0, { stiffness: 300, damping: 17 }),
							y: spring(this.state.flexState ? 0 : 50, { stiffness: 100, damping: 17 })
						}} >
							{({ opacity, y }) =>
								<form className='logForm' style={{
									WebkitTransform: `translate3d(0, ${y}px, 0)`,
									transform: `translate3d(0, ${y}px, 0)`,
									opacity: `${opacity}`
								}}>
									<h2>{this.props.type === 'signIn' ? 'SIGN IN' : 'SIGN UP'}</h2>
									<Input
										id="USER"
										type="text"
										placeholder="Username"
										EmptyField={this.state.errors.username}
										onChange={(evt) => { this.setState({ user: evt.target.value }) }} />

									{this.props.type === 'signIn' ? '' :
										<Input
											id="email"
											type="email"
											placeholder="Email"
											render=""
											EmptyField={this.state.errors.email}
											onChange={(evt) => { this.setState({ email: evt.target.value }); }} />}
									<Input
										id="password"
										type="password"
										placeholder="Password"
										EmptyField={this.state.errors.password}
										onChange={(evt) => { this.setState({ pass: evt.target.value }); }} />
									<div>
										<a className='wrongPass'>{this.state.validacao} </a>
										<SubmitButton type={this.props.type} onClick={this.props.type === 'signIn' ? this.onLogin : this.onCadastro} ></SubmitButton>
									</div>
									<a href="url" className='forgotPass'>{this.props.type === 'signIn' ? 'Forgot password?' : ''}</a>
								</form>
							}
						</Motion>
					</div>
				}
			</Motion>
		);
	}

}

SignExpanded.propTypes = {
	type: propTypes.string,
	userLogged: propTypes.func,
};

export default SignExpanded;