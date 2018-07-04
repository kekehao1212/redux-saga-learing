import { delay } from 'redux-saga'
import { put, takeEvery, all, take, call,select, fork} from 'redux-saga/effects'

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

function judgeIncrementGen() {
  let judge = Math.random()
  if (judge > 0.5) {
    return true
  } else {
    return false
  }
}


function* incrementAsync() {
  const state = yield select()
  console.log(state)
  yield delay(1000)
  console.log('INCREMENT')
  const judgeResult = yield call(judgeIncrement)
  console.log(judgeResult)
  debugger
  yield put({ type: 'INCREMENT' })
}

function* watchIncrementAsync() {
  // yield takeEvery('INCREMENT_ASYNC', incremetAsync)
  yield takeEvery('INCREMENT_ASYNC', main)
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

function testPromise(timeInterval, result) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, timeInterval)
  }).then(() => result)
  .catch(() => 'fail')
}

function testCreator(timeInterval, result, name) {
  return function* () {
    console.log(`${name}Begin`)
    const callResult = yield call(testPromise, timeInterval, result)
    console.log('callResult    ',callResult)
    console.log(`${name}Finishi`)
  }
}


function* testAll() {
  const test1Result = yield fork(testCreator(5000, 'test1111111111', 'test1'))
  console.log('tes1Result', test1Result)
  const test2Result = yield fork(testCreator(2000, 'test22222222222', 'test2'))
  console.log('test2Result', test2Result)
  console.log('testAll FINISHI')
}


function* main() {
  yield call(testAll)
  console.log('finishi')
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    watchIncrementAsync(),
    incrementThreeNotification()
  ])
} 