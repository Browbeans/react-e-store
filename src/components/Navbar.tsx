import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style/Navbar.css'
import { CartContext } from '../contexts/CartContext'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import BurgerMenu from './BurgerMenu';
import { Button } from '@material-ui/core';
import { btnMedium } from "../style/GeneralStyle";
import { CSSProperties } from '@material-ui/styles';

interface State {
  isMenuOpen: boolean;
}

class Navbar extends Component<{}, State> {
    context!: React.ContextType<typeof CartContext>
    static contextType = CartContext;

    state: State = {
      isMenuOpen: false
    }
    
    handleMenuClick = () => {
      this.setState({
        isMenuOpen: !this.state.isMenuOpen
      })
    }

    render() {
      return (
        <header className="main-header">
          <Link style={{ textDecoration: "none" }} to="/">
            <h2 className="header-title">ShoeWay</h2>
          </Link>
          <nav>
            <ul
              className="nav-links"
              style={{
                right: this.state.isMenuOpen ? "0%" : "-100%",
              }}
            >
              <Link
                style={{ textDecoration: "none", color: "#000" }}
                to="/products"
              >
                <li>Products</li>
              </Link>
                <li style={adminBtn}>Admin</li>
              
            </ul>
            <div className="cart-container">
              <Link to="/checkout" style={{ color: "#333" }}>
                <ShoppingCartOutlinedIcon style={{ fontSize: "1.5rem" }} />
              </Link>
              <div className="cart-content">{this.context.cart.length}</div>
            </div>
            <BurgerMenu
              value={this.state.isMenuOpen}
              handleClick={this.handleMenuClick}
            />
          </nav>
        </header>
      );
    }
}

export default Navbar


const adminBtn: CSSProperties = {
  margin: "-.5rem 1rem",
  background: "#56EAC6",
  padding: ".5rem 2rem",
  borderRadius: "2rem",
  color: "#fff",
};