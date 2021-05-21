import axios from 'axios';
import { Component, createContext } from 'react';

interface Product {
    id: string,
    qty: number   
}

export interface Order {
  ordernumber: string, 
  product: Product[],
  customer: string
}


interface State {
  userOrders: Order[]
}

interface ContextProps extends State {
  createOrder: (orderInfo: Order) => void
  getUserOrders: (user: string) => void
//   fetchProducts: () => void;
//   fetchSpecificProduct: () => void;
}

export const OrderContext = createContext<ContextProps>({
  userOrders: [],
  createOrder: (orderInfo: Order) => {},
  getUserOrders: (user: string) => {}
//   fetchProducts: () => {},
//   fetchSpecificProduct: () => {},
});

class OrderProvider extends Component<{}, State> {
  state: State = {
    userOrders: []
  };

  createOrderToDb = (orderInfo: Order) => {
    axios({
        method: 'post',
        url: '/order/add-order',
        headers: {
            'Content-Type': 'application/json'
        }, 
        data: orderInfo
      });
  }

  getUserOrdersFromDb = async (user: string) => {
    const request = await axios.get(`/order/user-orders/${user}`)
    const result = request.data

    const newUserOrder = [...this.state.userOrders, result]
    this.setState({ userOrders: newUserOrder })
  }

  componentDidMount = () => {

  };

  render() {
    return (
      <OrderContext.Provider
        value={{
          userOrders: this.state.userOrders,
          createOrder: this.createOrderToDb,
          getUserOrders: this.getUserOrdersFromDb
        }}
      >
        {this.props.children}
      </OrderContext.Provider>
    );
  }
}

export default OrderProvider;