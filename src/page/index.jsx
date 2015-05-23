import React from 'react'

import Chart from '../component/Chart'

export default class Index extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: [
				{letter: 'A', frequency: 0.08167},
				{letter: 'B', frequency: 0.01491},
				{letter: 'C', frequency: 0.02782},
				{letter: 'D', frequency: 0.04253},
				{letter: 'E', frequency: 0.12702},
				{letter: 'F', frequency: 0.02288},
				{letter: 'G', frequency: 0.02015},
				{letter: 'H', frequency: 0.06094},
				{letter: 'I', frequency: 0.06966},
				{letter: 'J', frequency: 0.00153},
				{letter: 'K', frequency: 0.02358}
			]
		}
	}

	_clickHanlder() {
		this.setState({
			data: this.state.data.slice(2)
		})
	}

	render() {
		let options = {
			height: 500,
			width: 960
		}
		return (
			<div>
				<h2 onClick={this._clickHanlder.bind(this)}>bar chart</h2>
				<Chart
					type = 'BarChart'
					data = {this.state.data}
					options = {options}
				/>
			</div>
		)
	}
}