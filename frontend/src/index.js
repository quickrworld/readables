import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import App from './components/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const middleware = [ thunk ]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(...middleware)
  )
)

ReactDOM.render(
  <Provider store={store}>
    <Router>
        <App/>
    </Router>
  </Provider>, document.getElementById('root'))

registerServiceWorker()
