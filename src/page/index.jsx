import React from 'react'
import d3 from 'd3'
import _ from 'lodash'

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
			],

			multiLineChartData: this.props.lineData
		}
	}

	renderTooltip(intervalData, translateCoords) {
		let style = {
			transform: `translate3d(calc(${translateCoords.x}px + 25%), ${translateCoords.y}px, 0)`
		}

		return (
			<div className='chart-tooltip' style={style}>
				<h4>{intervalData.letter}</h4>
				<p>data: {intervalData.frequency}</p>
			</div>
		)
	}

	_clickHanlder() {
		this.setState({
			data: this.state.data.slice(2)
		})
	}

	render() {
		let options = {
			height: 500,
			width: 960,
			tooltip: this.renderTooltip
		}
		return (
			<div>
				<h2 onClick={this._clickHanlder.bind(this)}>bar chart</h2>
				<Chart
					type = 'BarChart'
					data = {this.state.data}
					options = {options}
				/>
				<label>
					<input type='checkbox' onChange={e=> {
						if (e.target.checked) {
							this.setState({
								multiLineChartData: this.props.lineData.slice(-7)
							})
						} else {
							this.setState({
								multiLineChartData: this.props.lineData
							})
						}
						}}/>GO!
				</label>
				<Chart
					type='MultiLineChart'
					data={this.state.multiLineChartData}
					options = {options}
				/>
			</div>
		)
	}
}

let parseDate = d3.time.format('%Y%m%d').parse
let timeRange = [20150601,20150602,20150603,20150604,20150605,20150606,20150607,20150608,20150609,20150610,20150611,20150612,20150613,20150614,20150615,20150616,20150617,20150618,20150619,20150620,20150621,20150622,20150623,20150624,20150625,20150626,20150627,20150628,20150629,20150630]
let lineData = timeRange.map(time => {
	let key = time
	let values = {
		exposure: _.random(8000, 15000),
		browse: _.random(1500, 3000),
		contact: _.random(500, 1000),
		date: parseDate(time.toString())
	}
	return {key, values}
})

Index.defaultProps = {lineData: lineData}