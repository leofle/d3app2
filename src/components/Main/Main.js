import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Graph from '../Graph/Graph'
import GraphSvg from '../Graph/GraphSvg'
import Home from '../Home/Home'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/graph' component={Graph}/>
      <Route path='/graphsvg' component={GraphSvg}/>
    </Switch>
  </main>
)
export default Main;