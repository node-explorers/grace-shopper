import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import { logout, me } from '../store'

import history from '../history'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import CssBaseline from '@material-ui/core/CssBaseline'

import SearchBar from './SearchBar'
import { fetchCartThunk, deleteCartThunk } from '../store/cart'
import ProductCategory from './ProductCategory'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'

import List from '@material-ui/core/List'
import Drawer from '@material-ui/core/Drawer'
import classNames from 'classnames'
import Divider from '@material-ui/core/Divider'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Badge from '@material-ui/core/Badge'
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import AccountCircle from '@material-ui/icons/AccountCircle'

const drawerWidth = 240

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },

  grow: {
    flexGrow: 1
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  flexxer: {
    display: 'flex'
  },
  Administrator: {
    backgroundColor: 'yellow',
    color: 'black'
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
})
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
  async componentDidMount() {
    await this.props.cartObj()
    this.props.loadInitialData()
  }
  state = {
    open: false
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  render() {
    {
      /* const { classes } = this.props
    console.log(' Cart in navbar ', this.props.cart) */
    }

    const { classes, theme, isAdmin } = this.props
    const { open } = this.state
    if (!this.props.cart.cartItems) return <div />
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              onClick={() => {
                history.push('/')
              }}
              variant="h6"
              color="inherit"
              className={classNames(classes.grow, { hoveredStyle: 'pointer' })}
            >
              NODE EXPLORERS
            </Typography>

            <Button
              className={classes.badges}
              type="button"
              variant="contained"
              color="primary"
              size="large"
              onClick={() => history.push('/products')}
            >
              All Products
            </Button>
            {isAdmin ? (
              <Button
                className={classes.Administrator}
                type="button"
                variant="contained"
                color="primary"
                size="large"
                onClick={() => history.push('./adminBoard')}
              >
                Administrator Dashboard
              </Button>
            ) : null}

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <SearchBar style={{ justifyContent: 'center' }} />
            </div>
            <IconButton
              onClick={() => {
                history.push('/cart')
              }}
              color="inherit"
            >
              <Badge
                badgeContent={this.props.cart.cartItems.length}
                color="secondary"
              >
                <ShoppingCart />
              </Badge>
            </IconButton>
            <nav>
              {this.props.isLoggedIn ? (
                <div>
                  {/* The navbar will show these links after you log in */}

                  {/* <Link to="/home">Home</Link>
                  <Link to="#" onClick={this.handleClick}> */}

                  <IconButton
                    onClick={() => {
                      history.push('/yourprofile')
                    }}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Link
                    className={classes.badges}
                    to="#"
                    onClick={this.handleClick}
                  >
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
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {['Snowsports', 'Camping', 'Hiking'].map((text, index) => (
              <ListItem
                button
                key={text}
                onClick={() =>
                  history.push(`/products/category/${text.toLowerCase()}`)
                }
              >
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {this.props.isAdmin && (
              <div>
                <ListItem
                  button
                  key="Orders"
                  onClick={() => history.push('/orders')}
                >
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Orders/ Edit Order" />
                </ListItem>

                <ListItem
                  button
                  key="Add Products"
                  onClick={() => history.push('/addproducts')}
                >
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Product" />
                </ListItem>
              </div>
            )}
          </List>
        </Drawer>
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

    cart: state.cart,

    items: state.cart,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    logOut: () => dispatch(logout()),
    delete: id => dispatch(deleteCartThunk(id)),
    cartObj: () => dispatch(fetchCartThunk()),
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(
  withStyles(styles, { withTheme: true })(Navbar)
)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  //  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}
