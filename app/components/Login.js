import React, { Component } from "react";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Modal from './Modal';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mounted: false,
        };
    }

    componentDidMount() {
        this.setState({ mounted: true });
    }

    handleSubmit = (e) => {
        this.setState({ mounted: false });
        e.preventDefault();
    }

    render() {
        const { mounted } = this.state;
        let child;
        if (mounted) {
            child = (
                <div className="App_test">
                    <Modal {...this.props}/>
                </div>
            );
        }
        return (
            <div className="App">
                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {child}
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}

export default Login;