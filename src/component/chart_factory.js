import _ from 'lodash'
import d3 from 'd3'

import BarChart from './bar_chart'

export default function ChartFactory(type, data, node, options) {

	if (typeof ChartFactory[type] !== 'function' ||
		  typeof ChartFactory[type].prototype.update !== 'function') {
		throw new Error(`${type} is not a valid chart`)
	}

	if (!ChartFactory[type].prototype.initialize) {
		_.extend(ChartFactory[type].prototype, ChartFactory.prototype)
	}

	let newChart = new ChartFactory[type]()
	newChart.initialize(data, node, options)

	return newChart
}

ChartFactory.prototype.initialize = function(data, node, opts) {
	let defaults = {
		margin: {
			top: 20,
			right: 20,
			bottom: 30,
			left: 40
		}
	}
	let options = this.options = _.defaults(opts || {}, defaults)

	this.height = options.height - (options.margin.top + options.margin.bottom)
	this.width = options.width - (options.margin.left + options.margin.right)
	this.xAxis = d3.svg.axis().orient('bottom')
	this.yAxis = d3.svg.axis().orient('left')

	this.svg = d3.select(node).append('svg')
			.attr('width', this.width + options.margin.left + options.margin.right)
			.attr('height', this.height + options.margin.top + options.margin.bottom)
		.append('g')
			.attr('transform', 'translate(' + options.margin.left + ',' + options.margin.top + ')')

	this.svg.append('g')
			.attr('class', 'x axis')
			.attr('transform', 'translate(0,' + this.height + ')')
	this.svg.append('g')
			.attr('class', 'y axis')
		.append('text')
			.attr('transform', 'rotate(-90)')

	this.update(data)
	if (typeof this._addListeners == 'function') {
		this._addListeners();
	}
}

ChartFactory.BarChart = BarChart


