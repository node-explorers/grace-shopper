import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCategoryItems } from '../store/category'
import MakeCard from './MakeCard'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'


class ProductCategory extends Component {
  componentDidMount() {
    const category = this.props.match.params.name
    this.props.getCategoryItems(category)
  }

  render() {
    return (
      <div >
        <Grid container spacing={24}>
        {
          this.props.category.map(product => (
            <div key={product.id}>
            <MakeCard product={product} />
            </div>
          ))
        }
        </Grid>
        </div>
    )
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
})

function mapStateToProps(state) {
  return {
    category: state.category
  }
}

function mapDispatchToProps(dispach) {
  return {
    getCategoryItems: category => dispach(getCategoryItems(category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProductCategory))
