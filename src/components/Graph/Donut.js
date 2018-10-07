import React, { Component, Fragment } from 'react'
import * as d3 from 'd3'
import { scaleOrdinal } from 'd3-scale'
import { arc as d3Arc, pie as d3Pie } from 'd3-shape'
import {Button, Flex, InputDonut} from '../../styles'
import {StoreContext} from '../../store'

class DonutChart extends Component {
  constructor(props){
    super(props);
    this.state = {
      width: props.width,
      height: props.height,
      data: props.data,
      country: '',
      wins: null
    }
  }
  componentDidUpdate(prevProps){
    const {data} = this.props;
    if(data.length !== prevProps.data.length){
      this.setState({data});
    }
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
      <StoreContext.Consumer>
      {({state, changeCountry, changeWins, addCountry, removeCountry})=> (
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
            onChange={changeCountry}
          />
          <InputDonut type="number" 
            name="wins"
            placeholder="Add Wins"
            onChange={changeWins}
          />
          <Button color="greenyellow" onClick={addCountry}>Add</Button>
          <Button onClick={removeCountry}>Remove</Button>
        </Flex>
        <p>{state.country} {state.wins}</p>
      </Fragment>
          )
        }
      </StoreContext.Consumer>
    );
  }
};

export default DonutChart;