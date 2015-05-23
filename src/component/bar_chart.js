import d3 from 'd3'

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

		bar.attr('x', d => x(d.letter))
			.attr('width', x.rangeBand())
			.attr('y', d => y(d.frequency))
			.attr('height', d => (this.height - y(d.frequency)))

		bar.enter().append('rect')
			.attr('class', 'bar')
			.attr('x', d => x(d.letter))
			.attr('width', x.rangeBand())
			.attr('y', d => y(d.frequency))
			.attr('height', d => (this.height - y(d.frequency)))

		bar.exit().remove()
	}
}