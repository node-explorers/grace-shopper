import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'


import {isAdmin, deleteUser, passwordReset} from '../../store/user'


class UserManagement extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      isHidden: false
    }
    this.adminClick = this.adminClick.bind(this)
    this.deleteUser = this.deleteUser.bind(this)
    this.passwordReset = this.passwordReset.bind(this)
  }

  async componentDidMount() {
    const { data } = await axios.get('/api/users/')
    this.setState({
      users: data
    })
  }

  deleteUser(userId) {
    this.props.deleteUser(userId)
  }

  adminClick(userId, adminStatus) {
    event.preventDefault()
    this.props.isAdmin(userId, !adminStatus)
  }

  passwordReset(userId) {
    this.props.passwordReset(userId, true)
  }

  toggleHidden(){
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  render() {
    return (
      <Fragment>
        { this.props.isAdmin && (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User Id</TableCell>
                <TableCell>User Email</TableCell>
                <TableCell> Admin/ User</TableCell>
                <TableCell>Password Reset</TableCell>
                <TableCell>Delete User</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.users.map(user => {
                console.log("Here", user)
                return (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {
                        <Button
                          variant="contained"
                          type="submit"
                          name="adminToggle"
                          onClick={() => this.adminClick(user.id, user.isAdmin)}
                          >
                          Toggle
                        </Button>
                      }
                    </TableCell>
                    <TableCell>
                      {
                        <Button
                        variant="contained"
                        type="submit"
                        name="passwordReset"
                        onClick={() => this.passwordReset(user.id)}
                        >
                          Reset
                        </Button>
                      }
                    </TableCell>
                    <TableCell>
                      {
                        <Button
                          variant="contained"
                          color="secondary"
                          type="submit"
                          name="deleteUser"
                          onClick={() => this.deleteUser(user.id)}
                          >
                            Delete
                          </Button>
                        }
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </Paper>
        )}
      </Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    isAdmin: (userId, adminStatus) => dispatch(isAdmin(userId, adminStatus)),
    deleteUser: userId => dispatch(deleteUser(userId)),
    passwordReset: userId => dispatch(passwordReset(userId, true))
  }
}

const mapStateToProps = state => {
  return {
    isAdmin: state.user.isAdmin
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement)
