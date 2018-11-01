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
//new
import ProductCategory from './ProductCategory';

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



const Navbar = (props, { handleClick, isLoggedIn }) => {
  const { classes } = props

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


          <Button
            type="button"
            variant="contained"
            color="primary"
            size="large"
            onClick={() => history.push('/')}
          >
            Home
          </Button>


          <Link to={SNOW_SPORTS}>
          <Button
            type="button"
            variant="contained"
            color="primary"
            size="large"
            value="snowsports"
          >
          Snowsports
          </Button>
          </Link>

          <Link to={CAMPING}>
          <Button
            type="button"
            variant="contained"
            color="primary"
            size="large"
           >
            Camping
          </Button>
          </Link>

          <Link to={HIKING}>
          <Button
            type="button"
            variant="contained"
            color="primary"
            size="large"
          >
            Hiking
          </Button>
          </Link>

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
            {isLoggedIn ? (
              <div>
                {/* The navbar will show these links after you log in */}
                <Link to="/home">Home</Link>
                <a href="#" onClick={handleClick}>
                  Logout
                </a>
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
