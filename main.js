import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import Counter from './Counter'
import reducer from './reducers'

import saga from './sagas'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(saga)

const action = type => store.dispatch({type})


function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action('INCREMENT_ASYNC')}
      onDecrement={() => action('DECREMENT')}/>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
