import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import propTypes from 'prop-types';
import soFetch from '../../lib/soFetch.js';
import autoBind from 'react-autobind';
import { FaPlayCircle } from 'react-icons/fa';

class PlayGame extends Component {

	constructor(props) {
		super(props);
		autoBind(this);
		this.state = {
		};
	}

	render() {

		const icon = <FaPlayCircle className={this.props.className ? this.props.className : 'game-card-play-bottom-default'} />

		return (
			<div>
				{icon}
			</div>
		);
	}

}

PlayGame.propTypes = {
	className: propTypes.string,
	Play: propTypes.func,
};

export default PlayGame;