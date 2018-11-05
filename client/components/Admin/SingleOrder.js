import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import EditOrder from './EditOrder'
import { thunkOrder } from '../../store/order'

function mapState(state) {
  return {
    order: state.order.singleOrder
  }
}
function mapDispatch(dispatch) {
  return {
    fetchOrder: id => dispatch(thunkOrder(id))
  }
}

class SingleOrder extends React.Component {
  componentDidMount() {
    this.props.fetchOrder(Number(this.props.match.params.id))
  }
  componentWillUnmount() {}
  render() {
    const { order } = this.props
    console.log(this.props)
    return (
      <div className="sp">
        <img src="" />
        <h3>{order.status}</h3>
        <p>{order.status}</p>
        <EditOrder />
      </div>
    )
  }
}

export default withRouter(connect(mapState, mapDispatch)(SingleOrder))
