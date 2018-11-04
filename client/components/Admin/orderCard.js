import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import history from '../../history'
import { connect } from 'react-redux'

const styles = {
  card: {
    width: 400,
    height: 400
  },
  actionArea: {
    height: 350
  },
  media: {
    height: 'auto',
    paddingTop: '56.25%' // 16:9
  },
  actions: {
    display: 'flex'
  }
}

function OrderCard(props) {
  const { classes, order } = props

  return (
    <React.Fragment>
      <Card className={classes.card} raised={false}>
        <CardActionArea
          className={classes.actionArea}
          onClick={() => history.push(`/orders/${order.id}`)}
        >
          <CardMedia
            className={classes.media}
            image="https://i.vimeocdn.com/portrait/6462071_300x300"
            title={`${order.user.name}'s Order`}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {order.user.name}
            </Typography>
            <Typography component="h2">$ {order.totalPrice}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Edit Status
          </Button>
          <Button onClick={() => {}} size="small" color="primary" />
        </CardActions>
      </Card>
    </React.Fragment>
  )
}

OrderCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(OrderCard)
