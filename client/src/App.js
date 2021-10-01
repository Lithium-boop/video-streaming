import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import './App.css'

import Home from './Home'
import Player from './Player'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/player/:id" component={Player} />
      </Switch>
    </Router>
  )
}

export default App
