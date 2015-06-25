import d3 from 'd3'
import React from 'react'
import _ from 'lodash'

export default class MultiLineChart {
	update(data) {
		let color = d3.scale.category10()
		let x = d3.time.scale()
				.range([0, this.width])
		let y = d3.scale.linear()
				.range([this.height, 0])

		let interval = Math.ceil(data.length / 10)
		this.xAxis.scale(x).ticks(d3.time.day, interval).tickFormat(d3.time.format('%m-%d'))
		this.yAxis.scale(y)

		let line = d3.svg.line()
				.interpolate('basis')
				.x(d => x(d.date))
				.y(d => y(d.value))

		color.domain(d3.keys(data[0].values).filter(key => _.indexOf(['date', 'nickname', 'resume'], key) === -1))

		let multiLines = color.domain().map(name => ({
			name: name,
			values: data.map(d => ({
				date: d.values.date,
				value: +d.values[name]
			}))
		}))

		x.domain(d3.extent(data, d => d.values.date))
		y.domain([
			0,
			d3.max(multiLines, c => d3.max(c.values, v => v.value) * 1.2)
		])

		this.svg.select('.x.axis').call(this.xAxis)
		this.svg.select('.y.axis').call(this.yAxis)

		let lineArea = this.svg.selectAll('.line-area')
				.data(multiLines)

		lineArea.enter().append('g')
				.attr('class', 'line-area')
			.append('path')
				.attr('class', 'line')
				.attr('d', d => line(d.values))
				.style('stroke', d => color(d.name))

		lineArea.select('.line')
			.transition()
			.attr('d', d => line(d.values))
			.style('stroke', d => color(d.name))

		lineArea.exit().transition().remove()

	}
}