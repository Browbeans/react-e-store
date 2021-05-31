import { useContext, useState, useEffect } from "react";
import { Button } from '@material-ui/core'
import { btnMedium } from '../../style/GeneralStyle'
import { inactiveBtn } from '../../style/GeneralStyle'
import { CartContext } from "../../contexts/CartContext";
import '../../style/productItem.css'
import { useRouteMatch } from "react-router";
import { ProductContext, Product } from "../../contexts/ProductContext";

const ProductItem = () => {

  const match = useRouteMatch<{ id: string }>();
  const cart = useContext(CartContext)
  const productContext = useContext(ProductContext);
  const { fetchSpecificProduct } = useContext(ProductContext)
  let currentProduct = productContext.allProducts.find((specificProduct: Product) => specificProduct._id === match.params.id)
  const [isSize, setSize] = useState(false)
  console.log(currentProduct)


  useEffect(() => {
    fetchSpecificProduct(match.params.id)
    console.log('test')
  }, [fetchSpecificProduct, match.params.id])

  const handleClick = (size: number) => {
    //mutera ej statet
    if(currentProduct) {
      currentProduct.size = size
      setSize(!isSize)
    }
  }
  if(!currentProduct) {
    return <p>Product isnt available</p>
  }

  // uploads/1716luke-porter-rg1Z9NtEa80-unsplash.jpg
  // uploads/1716luke-porter-rg1Z9NtEa80-unsplash.jpg
  // console.log(currentProduct.image);

    return (
      <div className="productitem-container">
        <div className="image-div">
          <img className="image-style" src={`../${currentProduct.image}`} alt="a" />
        </div>
        <div className="product-div">
          <h2>{currentProduct.title}</h2>
          <div className="product-info">
            <div style={{ margin: "2rem 0" }}>
              <h4>Price</h4>
              <p>{currentProduct.price + " sek"}</p>
            </div>
            <div style={{ margin: "2rem 0" }}>
              <h4>Info</h4>
              <p>{currentProduct.info}</p>
            </div>
            <div className="sizes">
              {productContext.product.variants.map((p) => (
                <div className="size" onClick={() => handleClick(p.size)}>
                  <p>{p.size}</p>
                </div>
              ))}
            </div>
          </div>

          {isSize ? (
            <Button
              variant="contained"
              style={btnMedium}
              onClick={() => cart.addToCart(currentProduct!)}
            >
              Add to cart
            </Button>
          ) : (
            <Button variant="contained" style={inactiveBtn}>
              Please choose size
            </Button>
          )}
        </div>
      </div>
    );
}

export default ProductItem;
