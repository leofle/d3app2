import React, { Component } from 'react'

export default class Nodes extends Component {
	constructor(props){
		super(props);

		this.state = {
			nodes: []
		}
	}
	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.data && nextProps.data.length !== 0) {
			this.setState({nodes: nextProps.data})
		}
	}
	render() {
		return (
			<g className="nodes"></g>
		);
	}
}

