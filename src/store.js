import React from 'react'

export const store = {
  data: [],
  graph: {
    nodes: [],
    links: [],
  },
  msg:''
};

export const StoreContext = React.createContext({
  state: {
    data: store.data,
    graph: store.graph,
    msg: store.msg,
  }
});