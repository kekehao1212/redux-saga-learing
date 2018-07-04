import { delay } from 'redux-saga'
import { put, takeEvery, all, take, call} from 'redux-saga/effects'

function judgeIncrement() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      resolve()
    } else {
      reject()
    }
  }).then(() => 'resolve')
  .catch(() => 'reject')
}


function* incrementAsync() {
  yield delay(1000)
  console.log('INCREMENT')
  const judgeResult = yield call(judgeIncrement)
  console.log(judgeResult)
  // yield put({ type: 'INCREMENT' })
}

function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}


function* incrementThreeNotification() {
  for (let i = 0; i < 3; i++) {
    const action = yield take('INCREMENT')
    console.log(action)
  }
  yield clear()
}

function* clear() {
  yield put({type: 'CLEAR'})
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    watchIncrementAsync(),
    incrementThreeNotification()
  ])
}