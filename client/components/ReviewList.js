import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import axios from 'axios'

const styles = theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
})

class ReviewList extends Component {
  constructor() {
    super()
    this.state = {
      reviews: []
    }
  }

  //NOTE!!!!!!! ====----==== in order for this route to work, the parent component has to manually pass the category down as a prop
  async componentDidMount() {
    try {
      const { data } = await axios.get(
        `/api/reviews/${this.props.category}/${this.props.searchId}`
      )
      console.log(data)
      this.setState({
        reviews: data
      })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    console.log(this.state.reviews)
    const { classes } = this.props

    if (this.state.reviews.length) {
      return (
        <div className={classes.root}>
          {this.state.reviews.map((review, idx) => {
            return (
              <ExpansionPanel key={review.id}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>
                    <small>{idx}.</small> &ensp; <strong>{review.title}</strong>{' '}
                    &ensp; Rating:{review.rating}/5
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>{review.description}</Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            )
          })}
        </div>
      )
    } else {
      return <h3>No {this.props.category} Reviews</h3>
    }
  }
}

const mapUserReviewsToProps = state => {
  return {
    searchId: state.user.id
  }
}

const mapProductReviewsToProps = state => {
  return {
    searchId: state.products.singleProduct.id
  }
}

export const UserReviews = connect(mapUserReviewsToProps)(
  withStyles(styles)(ReviewList)
)

export const ProductReviews = connect(mapProductReviewsToProps)(
  withStyles(styles)(ReviewList)
)
