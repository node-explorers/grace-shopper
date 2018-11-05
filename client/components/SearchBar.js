import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchProduct } from '../store/product'
import history from '../history'

class SearchBar extends Component {
  constructor() {
    super()
    this.state = {
      name: ''
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

    const name = this.state.name
    this.setState({ name: '' })
    history.push(`/products/search/${name}`)
  }
  render() {
    const isEnabled = this.state.name.length > 0
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Search..."
          onChange={this.handleChange}
          value={this.state.name}
          required
        />
        <button type="submit" disabled={!isEnabled}>
          Submit
        </button>
      </form>
    )
  }
}

export default SearchBar
