import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  AllProduct,
  SingleProduct
} from './components'
import { me } from './store'

import ProductCategory from './components/ProductCategory'

import Cart from './components/Cart'
import { fetchCartThunk } from './store/cart'
import UserAcct from './components/UserAcct/UserAcct'
import SearchResults from './components/SearchResults'
import UserManagement from './components/Admin/UserManagement'
import AllOrder from './components/Admin/AllOrder'
import SingleOrder from './components/Admin/SingleOrder'
import StatusResults from './components/Admin/StatusResults'

import AdminDashboard from './components/Admin/AdminDashboard'
import AddProduct from './components/Admin/addProduct'
import Home from './components/Home'
/**
 * COMPONENT
 */
class Routes extends Component {
  render() {
    const { isLoggedIn, isAdmin } = this.props

    return (
      <div>
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route exact path="/home" component={Home} />
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route exact path="/yourprofile" component={UserAcct} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />

          <Route path="/products/category/:name" component={ProductCategory} />
          <Route
            exact
            path="/products/search/:keyword"
            component={SearchResults}
          />
          <Route
            exact
            path="/orders/search/:status"
            component={StatusResults}
          />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/orders" component={AllOrder} />
          <Route exact path="/orders/:id" component={SingleOrder} />
          <Route exact path="/products" component={AllProduct} />
          <Route path="/products/:productId" component={SingleProduct} />
          <Route path="/addproducts" component={AddProduct} />
          {/* <Route path="/home" component={UserHome} /> */}

          {isAdmin ? (
            <Route path="/adminBoard" component={UserManagement} />
          ) : null}
          {/* Routes placed here are only available after logging in */}
        </Switch>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  // loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
