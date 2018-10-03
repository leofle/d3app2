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
      graph: {},
      msg: ''
    }
  }
	UNSAFE_componentWillMount() {
		d3.json("flare.json").then(graph => {
			return this.setState({graph});
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
        }}>
          <Header/>
          <Main/>
        </StoreContext.Provider>
      </div>
    );
  }
}

export default App;
