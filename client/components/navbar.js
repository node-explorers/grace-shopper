import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import { logout } from '../store'
import history from '../history'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import SearchBar from './SearchBar'
import { fetchCartThunk, deleteCartThunk } from '../store/cart'
import ProductCategory from './ProductCategory'

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}

const SNOW_SPORTS = '/products/category/snowsports'
const CAMPING = '/products/category/camping'
const HIKING = '/products/category/hiking'

//const Navbar = (props, { handleClick, isLoggedIn }) => {
class Navbar extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.delete(this.props.cart.id)
    this.props.logOut()
    this.props.cartObj()
  }

  componentDidMount() {
    this.props.cartObj()
  }

  render() {
    const { classes } = this.props
    console.log(' Cart in navbar ', this.props.cart)
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              NODE EXPLORERS
            </Typography>
            <SearchBar />
            <Button
              type="button"
              variant="contained"
              color="primary"
              size="large"
              value="snowsports"
              onClick={() => history.push(SNOW_SPORTS)}
            >
              Snowsports
            </Button>

            <Button
              type="button"
              variant="contained"
              color="primary"
              size="large"
              onClick={() => history.push(CAMPING)}
            >
              Camping
            </Button>

            <Button
              type="button"
              variant="contained"
              color="primary"
              size="large"
              onClick={() => history.push(HIKING)}
            >
              Hiking
            </Button>

            <Button
              type="button"
              variant="contained"
              color="primary"
              size="large"
              onClick={() => history.push('/products')}
            >
              All Products
            </Button>
            <nav>
              {this.props.isLoggedIn ? (
                <div>
                  {/* The navbar will show these links after you log in */}
                  <Link to="/home">Home</Link>
                  <Link to="#" onClick={this.handleClick}>
                    Logout
                  </Link>
                </div>
              ) : (
                <div>
                  {/* The navbar will show these links before you log in */}
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Sign Up</Link>
                </div>
              )}
            </nav>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    logOut: () => dispatch(logout()),
    delete: id => dispatch(deleteCartThunk(id)),
    cartObj: () => dispatch(fetchCartThunk())
  }
}

export default connect(mapState, mapDispatch)(withStyles(styles)(Navbar))

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  //handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
