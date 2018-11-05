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
import { fetchAllReviews } from '../store/reviews'

const styles = theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    width: '100%',
    display: 'flex'
  },
  split: {
    flexBasis: '25%'
  },
  smallSplit: {
    flexBasis: '15%'
  }
})

class ReviewList extends Component {
  //NOTE!!!!!!! ====----==== in order for this route to work, the parent component has to manually pass the category down as a prop
  async componentDidMount() {
    try {
      const typeObj = {
        category: this.props.category,
        id: this.props.searchId
      }
      await this.props.fetchAll(typeObj)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { classes } = this.props

    if (this.props.reviews.length) {
      return (
        <div className={classes.root}>
          {this.props.reviews.map((review, idx) => {
            let name
            if (review.user) {
              name = review.user.email
            } else name = 'reviewed by guest'
            return (
              <ExpansionPanel key={review.id}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>
                    <small className={classes.smallSplit}>{idx}.</small> &ensp;
                    <strong className={classes.split}>{review.title}</strong>
                    &ensp;&ensp;&ensp; &ensp; Rating:{review.rating}/5
                    &ensp;&ensp;&ensp; &ensp; &ensp;
                    {this.props.category === 'product' ? (
                      <strong> {name}</strong>
                    ) : null}
                    <small>&ensp;{review.createdAt.slice(0, 10)}</small>
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
    searchId: state.user.id,
    reviews: state.reviews
  }
}

const mapProductReviewsToProps = state => {
  return {
    searchId: state.products.singleProduct.id,
    reviews: state.reviews
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAll: typeObj => dispatch(fetchAllReviews(typeObj))
  }
}

export const UserReviews = connect(mapUserReviewsToProps, mapDispatchToProps)(
  withStyles(styles)(ReviewList)
)

export const ProductReviews = connect(
  mapProductReviewsToProps,
  mapDispatchToProps
)(withStyles(styles)(ReviewList))
