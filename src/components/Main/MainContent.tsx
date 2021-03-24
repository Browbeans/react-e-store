import React, { useContext } from 'react';
import '../../style/Main.css'
import Startpage from './Startpage';
import ProductPage from './ProductPage';
import { Route, Switch } from 'react-router';
import ProductItem from './ProductItem';
import { Product, ProductData } from '../../data/productData'
import Checkout from '../Checkout/Checkout';
import OrderView from '../Orderview/OrderView';
import AdminPage from './Admin/AdminPage';
import AddNewProduct from './Admin/AddNewProduct';
import { AdminContext } from '../../contexts/AdminContext';

function MainContent() {

  const admin = useContext(AdminContext)
  admin.startLS()
  
    return (
      <main>
        <Switch>
          <Route exact path="/">
            <Startpage />
          </Route>
          <Route path="/products">
            <ProductPage />
          </Route>
          {admin.products.map((product: Product) => (
            <Route path={"/" + product.title} key={product.title}>
              <ProductItem product={product} />
            </Route>
          ))}
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/orderview">
            <OrderView />
          </Route>
          <Route path="/admin">
            <AdminPage />
          </Route>
          <Route path="/addNewProduct">
            <AddNewProduct />
          </Route>
        </Switch>
      </main>
    );
}

export default MainContent
