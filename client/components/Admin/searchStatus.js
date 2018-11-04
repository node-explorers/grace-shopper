import React, { Component } from 'react'
import { connect } from 'react-redux'
//import { searchProduct } from '../store/product'
import history from '../../history'

class SearchStatus extends Component {
  constructor() {
    super()
    this.state = {
      status: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    //console.log(this.state.name)
    const status = this.state.status
    this.setState({ status: '' })
    history.push(`/orders/search/${status}`)
  }
  render() {
    const isEnabled = this.state.status.length > 0
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="status"
          placeholder="Search..."
          onChange={this.handleChange}
          value={this.state.status}
          required
        />
        <button type="submit" disabled={!isEnabled}>
          Submit
        </button>
      </form>
    )
  }
}

export default SearchStatus
