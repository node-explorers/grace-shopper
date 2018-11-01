import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchProduct } from '../store/product'

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
    console.log(this.state.name)
    this.props.findProducts(this.state.name)
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Search..."
          onChange={this.handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    findProducts: keyword => {
      dispatch(searchProduct(keyword))
    }
  }
}

export default connect(null, mapDispatch)(SearchBar)
