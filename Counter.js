/*eslint-disable no-unused-vars */
import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';

class Counter extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <button onClick={this.props.add}>
          Increment
        </button>
        {' '}
        <button onClick={this.props.dec}>
          Decrement
        </button>
        <hr />
        <div>
          Clicked: {this.props.count} times
        </div>
      </div>
    )
  }
}

const actionCreators = (value) => ({
  type: 'ADD',
  value
})

function mapStateToProps(state) {
  return {
    count: state.count
  }
}

const mapDispatchToProps = {
  add: () => ({type: 'INCREMENT_ASYNC'}),
  dec: () => ({type: 'DECREMENT'})
}
// function mapDispatchToProps(dispatch) {
//   console.log(bindActionCreators(() => ({type: 'INCREMENT_ASYNC'}),dispatch))
//   return {
//     add: bindActionCreators(() => ({type: 'INCREMENT_ASYNC'}),dispatch),
//     dec: bindActionCreators(() => ({type: 'INCREMENT_ASYNC'}),dispatch)
//   }
// }

function mergeProps(stateprops, dispatchProps, ownProps) {
  console.log(stateprops, dispatchProps, ownProps)
  return {
    count: 100
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Counter)

Counter.propTypes = {
  count: PropTypes.number,
  onIncrement: PropTypes.func,
  onDecrement: PropTypes.func
}

