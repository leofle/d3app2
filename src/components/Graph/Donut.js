import React from 'react'
import * as d3 from 'd3'
import { scaleOrdinal } from 'd3-scale'
import { arc as d3Arc, pie as d3Pie } from 'd3-shape'
import { csvParse } from 'd3-dsv'

// Same as data.csv
import dataCsv from './data'

const width = 960,
  height = 500,
  radius = Math.min(width, height) / 2;

const color = scaleOrdinal(d3.schemeSet3);

const arc = d3Arc()
  .outerRadius(radius - 10)
  .innerRadius(radius - 70);

const pie = d3Pie()
  .sort(null)
  .value(function(d) {
    return d.population;
  });

const data = pie(
  csvParse(dataCsv, d => {
    d.population = +d.population;
    return d;
  })
);

const DonutChart = () => {
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${width / 2}, ${height / 2})`}>
        {data.map(d => (
          <g className="arc" key={`a${d.data.age}`}>
            <path d={arc(d)} fill={color(d.data.age)} />
            <text transform={`translate(${arc.centroid(d)})`} dy=".35em">
              {d.data.age}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
};

export default DonutChart;