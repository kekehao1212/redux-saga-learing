

export default ({getState, dispatch}) => next => action => {
  console.log('do action')
  next(action)
}