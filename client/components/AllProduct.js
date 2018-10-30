import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/product'
import {Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button} from 'reactstrap'

function mapState(state){
  return{
    products:state.products
  }
}
function mapDispatch(dispatch){
  return{
    fetchingProduct:()=>dispatch(fetchProduct())
  }
}


class AllProduct extends React.Component{
  constructor(){
    super()

  }
  componentDidMount(){
    this.props.fetchingProduct()
  }
  render(){
    return (
      <div>
        {this.props.products.map((product)=><div key={product.id}>
        <Card>
        <CardImg top width="100%" src={product.imageUrl} alt="Card image cap" />
        <CardBody>
          <CardTitle>{product.name}</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>{product.description}</CardText>
          <Button color='primary' >Add to Cart</Button>
        </CardBody>
      </Card>

        </div>)}

      </div>
    )
  }

}
export default connect(mapState,mapDispatch)(AllProduct)
