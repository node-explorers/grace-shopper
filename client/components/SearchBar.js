import React from 'react';
import { connect } from 'react-redux';

class SearchBar extends Component {
  constructor(){
    super()
    this.state = {
      name:''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event){
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit(event){
    event.preventDefault()
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Enter name to search by:</h1>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          onChange={this.handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(null, mapDispatchToProps)(SearchBar)
