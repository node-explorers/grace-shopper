import React from 'react'
import { connect } from 'react-redux'
import { fetchProduct, deleteSingleItem } from '../store/product'
import { addCartItemThunk } from '../store/cart'
import { withRouter } from 'react-router-dom'
import EditProduct from './Admin/editProduct'
import { ProductReviews } from './ReviewList'
import ReviewForm from './ReviewForm'
import Button from '@material-ui/core/Button'

function mapState(state) {
  return {
    singleProduct: state.products.singleProduct,
    isAdmin: state.user.isAdmin,
    cart: state.cart
  }
}
function mapDispatch(dispatch) {
  return {
    fetchingProduct: productId => {
      dispatch(fetchProduct(productId))
    },
    deleteSingle: () => dispatch(deleteSingleItem()),
    addItem: (productId, cartId, price) => {
      return dispatch(
        addCartItemThunk({
          productId,
          cartId,
          price
        })
      )
    }
  }
}

export class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.fetchingProduct(Number(this.props.match.params.productId))
  }
  componentWillUnmount() {
    this.props.deleteSingle()
  }
  render() {
    if (!this.props.singleProduct) return <div>No Product</div>
    const { singleProduct, cart } = this.props

    return (
      <div className="sp">
        <img src={singleProduct.imageUrl} />
        <h3>{singleProduct.name}</h3>
        <p>{singleProduct.description}</p>
        <Button
          onClick={() =>
            this.props.addItem(singleProduct.id, cart.id, singleProduct.price)
          }
          size="large"
          color="primary"
          variant="contained"
        >
          Add To Cart
        </Button>
        {this.props.isAdmin && <EditProduct />}
        <ReviewForm name={singleProduct.name} />
        <p>All Reviews:</p>
        {this.props.singleProduct.id ? (
          <ProductReviews category="product" />
        ) : null}
      </div>
    )
  }
}

export default withRouter(connect(mapState, mapDispatch)(SingleProduct))
