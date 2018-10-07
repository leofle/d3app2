import React, { Component } from 'react'
import * as d3 from 'd3'
import './App.scss'
import {StoreContext} from './store'
import Header from './components/Header/Header'
import Main from './components/Main/Main'

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      data: [],
      graph: {},
      msg: '',
      country: '',
      wins: null
    }
  }
	UNSAFE_componentWillMount() {
		d3.json("flare.json").then(graph => {
			return this.setState({graph});
    });
    
    d3.json("data.json").then(data => {
			return this.setState({data});
		});
	}

  render() {
    return (
      <div className="App">
        <StoreContext.Provider value={{
          state: this.state,
          changeText: (event) => {
            this.setState({msg: event.target.value})
          },
          changeCountry: (event)=>{
            this.setState({country: event.target.value});
          },
          changeWins: (event)=>{
            this.setState({wins: Number(event.target.value)});
          },
          addCountry: ()=>{
            const {country, wins} = this.state;
            if(!country || !wins) return;
              let data = [...this.state.data,{
                "team": country,
                "wins": wins
              }]
            this.setState({data, country: '', wins: null})
          },
          removeCountry: ()=> {
            const {country} = this.state;
            if(!country) return;
              let data = this.state.data.filter( el => el.team !== country );
              this.setState({data})
          }
        }}>
          <Header/>
          <Main/>
        </StoreContext.Provider>
      </div>
    );
  }
}

export default App;
