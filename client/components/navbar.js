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
import ProductCategory from './ProductCategory'
import CategoryDrawer from './CategoriesDrawer'
import { Drawer } from '@material-ui/core'

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

const ALL_PRODUCTS = '/products'

//const Navbar = (props, { handleClick, isLoggedIn }) => {
class Navbar extends React.Component {
  constructor() {
    super()
  }

  render() {
    const { classes } = this.props
    //console.log(this.props.isLoggedIn)
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <CategoryDrawer />
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
              onClick={() => history.push(ALL_PRODUCTS)}
            >
              ALL PRODUCTS
            </Button>
            <nav>
              {this.props.isLoggedIn ? (
                <div>
                  {/* The navbar will show these links after you log in */}
                  <Link to="/home">Home</Link>
                  <Link to="#" onClick={this.props.handleClick}>
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
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(withStyles(styles)(Navbar))

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
