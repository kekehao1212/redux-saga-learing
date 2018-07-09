import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import {Provider} from 'react-redux'
import Counter from './Counter'
import reducer from './reducers'
import myMiddle from './myMiddle'
import saga from './sagas'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer,
  {count: 10},
  applyMiddleware(sagaMiddleware, myMiddle)
)
sagaMiddleware.run(saga)

const action = type => store.dispatch({type})


function render() {
  ReactDOM.render(
    <Provider store = {store}>
      <Counter
        onIncrement={() => action('INCREMENT_ASYNC')}
        onDecrement={() => actin('DECREMENT')}/>
      </Provider>,
    document.getElementById('root')
  )
}

render()
