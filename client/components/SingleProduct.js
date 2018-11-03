import React from 'react'
import { connect } from 'react-redux'
import { fetchProduct, deleteSingleItem } from '../store/product'
import { withRouter } from 'react-router-dom'
import EditProduct from './Admin/editProduct'

import { ProductReviews } from './ReviewList'

function mapState(state) {
  return {
    singleProduct: state.products.singleProduct,
    isAdmin: state.user.isAdmin
  }
}
function mapDispatch(dispatch) {
  return {
    fetchingProduct: productId => {
      dispatch(fetchProduct(productId))
    },
    deleteSingle: () => dispatch(deleteSingleItem())
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
    const { singleProduct } = this.props

    return (
      <div className="sp">
        <img src={singleProduct.imageUrl} />
        <h3>{singleProduct.name}</h3>
        <p>{singleProduct.description}</p>
        {this.props.isAdmin && <EditProduct />}
        <p>All Reviews:</p>
        {this.props.singleProduct.id ? (
          <ProductReviews category="product" />
        ) : null}
      </div>
    )
  }
}

export default withRouter(connect(mapState, mapDispatch)(SingleProduct))
