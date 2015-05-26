import d3 from 'd3'
import React from 'react'

export default class BarChart {
	update(data) {
		let x = d3.scale.ordinal()
				.rangeRoundBands([0, this.width], .1)

		let y = d3.scale.linear()
				.range([this.height, 0])

		this.xAxis.scale(x)
		this.yAxis.scale(y).ticks(10, '%')

		x.domain(data.map(d => d.letter))
		y.domain([0, d3.max(data, d => d.frequency)])

		this.svg.select('.x.axis').call(this.xAxis)
		this.svg.select('.y.axis').call(this.yAxis)

		let bar = this.svg.selectAll('.bar')
				.data(data)


		bar.enter().append('rect')
			.attr('class', 'bar')
			.attr('x', d => x(d.letter))
			.attr('width', x.rangeBand())
			.attr('y', d => y(d.frequency))
			.attr('height', d => (this.height - y(d.frequency)))

		bar.transition()
			.attr('x', d => x(d.letter))
			.attr('width', x.rangeBand())
			.attr('y', d => y(d.frequency))
			.attr('height', d => (this.height - y(d.frequency)))

		bar.exit().transition().remove()
	}

	_addListeners() {
		if (this.options.tooltip) {
			this.svg.on('mouseover', _.partial(this._onMouseOver, this.options))
			this.svg.on('mouseout', _.partial(this._onMouseOut))
		}
	}

	_onMouseOver(options) {
		this.tooltipNode = this.parentNode.parentNode.children[0]

		if (d3.select(d3.event.target).classed('bar')) {
			let barGroup = d3.event.target
			let intervalData = barGroup.__data__
			let x = d3.select(d3.event.target).attr('x')
			let y = d3.select(d3.event.target).attr('y')
			React.render(options.tooltip(intervalData, {x: x, y: y-70}), this.tooltipNode)
		}
	}

	_onMouseOut() {
		if (d3.select(d3.event.target).classed('bar')) {
			React.unmountComponentAtNode(this.tooltipNode)
		}
	}
}