import { delay } from 'redux-saga'
import { put, takeEvery, all } from 'redux-saga/effects'


function* incrementAsync() {
  yield delay(1000)
  yield put({ type: 'INCREMENT' })
}
function* helloSaga() {
  console.log('hello')
}

function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

function* watchIncrementAsync2() {
  yield takeEvery('INCREMENT_ASYNC', increment)
}

function* increment () {
  console.log('increment')
  yield put({type: 'INCREMENT'})
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync(),
    watchIncrementAsync2()
  ])
}