import React from 'react'
import { connect } from 'react-redux'
import { fetchProduct } from '../store/product'
import { withRouter } from 'react-router-dom'
import EditProduct from './Admin/editProduct'
import { deleteSingleItem } from '../store/product'

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

        {this.props.isAdmin && <EditProduct />}
      </div>
    )
  }
}

export default withRouter(connect(mapState, mapDispatch)(SingleProduct))
