import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import UserOrders from './UserOrders'
import Cart from '../Cart'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
})

class UserAcct extends React.Component {
  state = {
    value: 1
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  render() {
    const { classes } = this.props
    const { value } = this.state

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Your Account Information:" disabled />
            <Tab label="Orders" />
            <Tab label="Reviews" />
            <Tab label="Shopping Cart" />
          </Tabs>
        </AppBar>
        {value === 1 && (
          <TabContainer>
            <UserOrders />
          </TabContainer>
        )}
        {value === 2 && <TabContainer>Reviews</TabContainer>}
        {value === 3 && (
          <TabContainer>
            <Cart />
          </TabContainer>
        )}
      </div>
    )
  }
}

UserAcct.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(UserAcct)
