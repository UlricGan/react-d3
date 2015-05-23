import React from 'react'

import ChartFactory from './chart_factory'

export default class Chart extends React.Component {
	componentDidMount() {
		this._chart = new ChartFactory(
			this.props.type,
			this.props.data,
			React.findDOMNode(this),
			this.props.options
		)
	}

	componentDidUpdate() {
		this._chart.update(this.props.data)
	}

	componentWillUnmount() {
		//this._chart.remove()
	}

	render() {
		return (
			<div className="chart-sec"></div>
		)
	}

}

Chart.propTypes = {
	type: React.PropTypes.string.isRequired,
	data: React.PropTypes.array.isRequired,
	options: React.PropTypes.object
}