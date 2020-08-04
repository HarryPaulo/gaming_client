import React, { Component } from 'react';
import './app.global.css';
import './css/Game.css';
import Login from './components/Login';
import Error from './components/Error';
import GamesList from './components/GameList/Games';
import PlayingStats from './components/GameList/PlayingStats.js';
import { Route, Redirect, Switch } from "react-router-dom";
import { withRouter } from 'react-router';

const isAuthenticated = () => {
	return true;
	//localStorage.getItem('token') !== null && localStorage.getItem('token') !== '';
};

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			isAuthenticated() ? (
				<Component {...props} />
			) : (
					<Redirect
						to={{
							pathname: "/",
							state: { from: props.location }
						}}
					/>
				)
		}
	/>
);

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			logged: false,
			janela: 0,
		};
	}

	render() {
		console.log(this.props);
		return (
			<Switch>
				<PrivateRoute exact path="/GamesList" component={GamesList} />
				<PrivateRoute exact path="/PlayingStats" component={PlayingStats} />				
				<PrivateRoute path="/" component={GamesList} />								
				{/* <PrivateRoute path="/" component={Login} />				 */}

			 	{/* <PrivateRoute exact path="/GamesList" component={GamesList} />
			 	<PrivateRoute exact path="/PlayingStats" component={PlayingStats} />
			 	<PrivateRoute exact path="" component={Login} />
				<PrivateRoute exact path="" component={Login} />			 */}
				
			</Switch>


			// <Switch>
			// 	{/* <Route path="/" component={Login} /> */}
			// 	<Route path="/gameList" exact component={Login} />
			// 	<Route path="/" component={GamesList} />
			// 	<Route exact component={Error} />
			// </Switch>
		)
	}
}
export default App;
// export default withRouter(App);