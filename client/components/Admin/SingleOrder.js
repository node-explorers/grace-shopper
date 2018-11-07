import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
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

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell)

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  }
})

class SingleOrder extends React.Component {
  componentDidMount() {
    this.props.fetchOrder(Number(this.props.match.params.id))
  }

  totalPrice = () => {
    let total = 0
    this.props.order.orderItems.forEach(item => {
      total += item.quantity * +item.price
    })
    return Number(total).toFixed(2)
  }

  componentWillUnmount() {}
  render() {
    const { order } = this.props
    const { classes } = this.props
    console.log(this.props.order)
    return (
      <div className="sp">
        <div>Order of {this.props.order.email}</div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>Item Name</CustomTableCell>
                <CustomTableCell>Price</CustomTableCell>
                <CustomTableCell>Quantity</CustomTableCell>
              </TableRow>
            </TableHead>

            {this.props.order.orderItems && (
              <TableBody>
                {this.props.order.orderItems.map(item => {
                  return (
                    <TableRow key={item.id}>
                      <CustomTableCell>{item.product.name}</CustomTableCell>
                      <CustomTableCell>{item.price}</CustomTableCell>
                      <CustomTableCell>{item.quantity}</CustomTableCell>
                    </TableRow>
                  )
                })}
                <TableRow>
                  <h3> Total: $</h3>
                  {this.totalPrice()}
                </TableRow>
              </TableBody>
            )}
          </Table>
        </Paper>
        <img src="" />
        <h3>{order.status}</h3>
        <EditOrder />
      </div>
    )
  }
}

//export default withRouter(connect(mapState, mapDispatch)(SingleOrder))
export default connect(mapState, mapDispatch)(withStyles(styles)(SingleOrder))
