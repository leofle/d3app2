import React from 'react'

export const store = {
  graph: {
    nodes: [],
    links: [],
  },
  msg:''
};

export const StoreContext = React.createContext({
  state: {
    graph: store.graph,
    msg: store.msg,
  }
});