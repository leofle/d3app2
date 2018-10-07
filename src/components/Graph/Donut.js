import React, { Component, Fragment } from 'react'
import * as d3 from 'd3'
import { scaleOrdinal } from 'd3-scale'
import { arc as d3Arc, pie as d3Pie } from 'd3-shape'
import {Button, Flex, InputDonut} from '../../styles'

class DonutChart extends Component {
  constructor(props){
    super(props);
    this.state = {
      width: props.width,
      height: props.height,
      data: props.data.data,
      country: '',
      wins: null
    }
  }

  addCountry = ()=>{
    const {country, wins} = this.state;
    if(!country || !wins) return;
      let data = [...this.state.data,{
        "team": country,
        "wins": wins
      }]
      this.setState({data})
  }
  removeCountry = ()=> {
    const {country} = this.state;
    if(!country) return;
      let data = this.state.data.filter( el => el.team !== country );
      this.setState({data})
  }
  changeCountry = (event)=>{
      this.setState({country: event.target.value})
  }
  changeWins = (event)=>{
      this.setState({wins: event.target.value})
  }
  render() {
    const {width, height} = this.state;
    const radius = Math.min(width, height) / 2;

    const color = scaleOrdinal(d3.schemeSet3);

    const arc = d3Arc()
      .outerRadius(radius - 10)
      .innerRadius(radius - 70);

    const pie = d3Pie()
      .sort(null)
      .value(function (d) {
        return d.wins;
      });

    let data = pie(this.state.data);

    return (
      <Fragment>
        <svg width={width} height={height}>
          <g transform={`translate(${width / 2}, ${height / 2})`}>
            {data.map(d => (
              <g className="arc" key={`a${d.data.team}`}>
                <path d={arc(d)} fill={color(d.data.team)} />
                <text transform={`translate(${arc.centroid(d)})`} dy=".35em">
                  {d.data.team}
                </text>
              </g>
            ))}
          </g>
        </svg>
        <Flex>
          <InputDonut type="text" 
            name="country"
            placeholder="Add Country"
            onChange={this.changeCountry}
          />
          <InputDonut type="text" 
            name="wins"
            placeholder="Add Wins"
            onChange={this.changeWins}
          />
          <Button color="greenyellow" onClick={this.addCountry}>Add</Button>
          <Button onClick={this.removeCountry}>Remove</Button>
        </Flex>
        <p>{this.state.country} {this.state.wins}</p>
      </Fragment>
    );
  }
};

export default DonutChart;