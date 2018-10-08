import React from 'react'
import createStore from 'react-waterfall'

export const store = {
  data: [],
  graph: {
    nodes: [],
    links: [],
  },
  msg:'',
  country: '',
  wins: null
};

export const StoreContext = React.createContext({
  state: {
    data: store.data,
    graph: store.graph,
    msg: store.msg,
    country: store.country,
    wins: store.wins
  }
});


const config = {
  initialState: { 
    data: [],
    graph: {
      nodes: [],
      links: [],
    },
    msg:'',
    country: '',
    wins: null
  },
  actionsCreators: {
    changeText: (event) => ({msg: event.target.value}),
  },
}

export const { Provider, Consumer, connect, actions } = createStore(config)