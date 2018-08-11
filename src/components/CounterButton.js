import React, { Component } from 'react';

export default class CounterButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.count !== nextState.count;
    }

    updateCount() {
        this.setState(state => {
            return { count: state.count + 1 }
        });
    }

    render() {
        console.log("CounterButton");
        return (
            <button color={this.props.color} onClick={this.updateCount.bind(this)}>
                Count: {this.state.count}
            </button>
        );
    }
}