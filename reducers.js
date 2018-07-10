import {
  combineReducers
} from "redux";

function counterReaducer(state = {
  count: 2
}, action) {
  console.log(state, action)
  switch (action.type) {
    case 'INCREMENT':
      return Object.assign({}, {count: state.count+1})
    case 'DECREMENT':
      return Object.assign({}, {count: state.count-1})
    case 'CLEAR':
      return Object.assign({}, {count: 0})
    default:
      return state
  }
}

function testReaducer(state = 'djskdsk', action) {
  if (action.type === 'INCREMENT') {
    console.log('reducer2')
  }
  return state
}

export default combineReducers({
  counter: counterReaducer,
  test: testReaducer
})