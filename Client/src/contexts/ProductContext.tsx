import axios from 'axios';
import { Component, createContext } from 'react';
import { StockSizeProduct } from '../components/Main/Admin/AddStockAndSize';

interface Variants {
  size: number;
  stock: number;
  quantity: number,
}

interface CurrentProduct {
  _id?: string;
  title: string;
  info: string;
  price: number;
  image: string;
  variants: Variants[];  
  category: string[]; 
}
export interface Product {
  _id?: string;
  title: string;
  info: string;
  price: number;
  image: string;
  size: number, 
  quantity: number, 
  stock: number,  
  category: string[], 
}

interface State {
  product: CurrentProduct;
  allProducts: Product[];
  categories: String[]
}

interface ContextProps extends State {
  fetchProducts: () => void;
  fetchSpecificProduct: (id: string) => void;
  removeProduct: (product: Product) => void;
  getImage: (product: Product) => void;
  addProduct: (product: Product) => void;
  editProduct: (editedProduct: Product, currentProduct: any) => void;
  getCategories: (categories: String[]) => void
  addStockSize: (product: StockSizeProduct) => void
}

export const ProductContext = createContext<ContextProps>({
  product: {
    _id: '',
    title: '',
    info: '',
    price: 0,
    image: '',
    variants: [{
      size: 0,
      stock: 0,
      quantity: 0,
    }],
    category: [],
  },
  categories: [],
  allProducts: [],
  getCategories: () => {},
  fetchProducts: () => {},
  fetchSpecificProduct: (id: string) => {},
  getImage: (product: Product) => {},
  removeProduct: (product: Product) => {},
  addProduct: (product: Product) => {},
  editProduct: (editedProduct: Product, currentProduct: any) => {},
  addStockSize: (product: StockSizeProduct) => {}
});

class AxiosProvider extends Component<{}, State> {
  state: State = {
    product: {
      _id: '',
      title: '',
      info: '',
      price: 0,
      image: '',
      variants: [{
        size: 0,
        stock: 0,
        quantity: 0,
      }],
      category: [],
    } ,
    allProducts: [],
    categories: []
  };

  fetchProducts = async () => {
    try {
      const request = await axios.get("/products");
      this.setState({ allProducts: request.data });
      return request;
    } catch (error) {
      console.log(error)
    }
  };

  fetchSpecificProduct = async (id: string) => {
    const request = await axios.get(`/products/${id}`);
    this.setState({ product: request.data }); 
    return request;
  };

  removeProduct = async (product: Product) => {
    const id = product._id;
    const request = await axios.delete(`/products/${id}`);
    this.fetchProducts();
    return request;
  };

  getImage = async (product: Product) => {
      // const id = product._id;
      // const request = await axios.get(`/image/getImage/${id}`)
      // // console.log(request)
      // // console.log(product)
      // console.log(id);
      // return request;
  }

  addProduct = async (product: Product) => {
    const completedProduct = { ...product, quantity: 1, category: this.state.categories };
    const request = await axios.post("/products/addProduct", completedProduct);
    this.fetchProducts();
    return request;
  };

  editProduct = async (editedProduct: Product, currentProduct: any) => {
    const completedProduct = { ...editedProduct, category: this.state.categories };
    const id = editedProduct._id;
    const request = await axios({
      method: "put",
      url: `/products/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: completedProduct,
    });

    this.fetchProducts();
    return request;
  };

  addStockAndSize = async (productValues: StockSizeProduct) => {

    const id = productValues.id;
    const request = await axios({
      method: "post",
      url: `/products/add-size-stock/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: productValues,
    });

    this.fetchProducts();
    return request;
  }

  setCategoriesToState = (categories: String[]) => {
    categories.forEach((category) => {
      if(category === 'unisex'){
        this.setState({categories: ['mens', 'unisex', 'womens']})
      } else {
        this.setState({ categories: categories})
      }
    })
  }

  componentDidMount = () => {
    this.fetchProducts();
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          fetchProducts: this.fetchProducts,
          fetchSpecificProduct: this.fetchSpecificProduct,
          removeProduct: this.removeProduct,
          addProduct: this.addProduct,
          getImage: this.getImage,
          editProduct: this.editProduct, 
          getCategories: this.setCategoriesToState,
          addStockSize: this.addStockAndSize
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

export default AxiosProvider;

