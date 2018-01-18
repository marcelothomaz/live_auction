// src/app-client.js
import React, { Component } from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import routes from './routes'

const App = () => (
   <Router onUpdate={() => window.scrollTo(0,0)}>
      {renderRoutes(routes)}
   </Router>
)

render(<App/>, document.getElementById('app'))

export default App
