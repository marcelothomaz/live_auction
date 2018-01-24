// src/app-client.js
import React, { Component } from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reducers from './reducers'
import routes from './routes'

const store = createStore(
   reducers,
   composeWithDevTools(applyMiddleware(thunk))
)

const App = () => (
   <Provider store={store}>
      <Router onUpdate={() => window.scrollTo(0,0)}>
         {renderRoutes(routes)}
      </Router>
   </Provider>
)

render(<App/>, document.getElementById('app'))

export default App
