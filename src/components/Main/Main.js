import React from 'react'
import { Switch, Route } from 'react-router-dom'
import asyncComponent from '../Async/Async'
const AsyncHome = asyncComponent(() => import("../Home/Home"));
const AsyncGraphSvg = asyncComponent(() => import("../Graph/GraphSvg"));

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={AsyncHome}/>
      <Route exact path='/graphsvg' component={AsyncGraphSvg}/>
    </Switch>
  </main>
)
export default Main;