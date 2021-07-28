import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Home } from './Home';
import { DetailedProductInfo } from './DetailedProductInfo';
import { ShoppingCart } from './ShoppingCart';

function App() {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(item) {
    setCartItems(cartItems => [...cartItems, item]);
  }

  function removeFromCart(itemForRemoval) {
    const newCart = cartItems.filter(item => {
      return item.id !== itemForRemoval.id
    });
    setCartItems(newCart);
  }

  function increaseQuantity(id) {
    const newCart = cartItems.map(item => {
      const newQuantity = item.quantity + 1;
      if (item.id === id) {
        item.quantity = newQuantity
      }
      return item;
    });
    setCartItems(newCart);
  }

  function decreaseQuantity(id) {
    const newCart = cartItems.map(item => {
      const newQuantity = item.quantity - 1;
      if (item.id === id) {
        if (newQuantity >= 1) {
          item.quantity = newQuantity
        } else {
          alert(`Quantity can't be less then 1`)
        }
      }
      return item;
    });
    setCartItems(newCart);
  }

  return (
    <>
      <BrowserRouter>
        <div className='header'>
          <div className='header-items'>
            <Link to='/' className='logo'>ShopIn</Link>
            <div className='header-links-holder'>
              <Link to='/' className='header-link'>Home</Link>
              <Link to='/cart' className='header-link'>ShoppingCart</Link>
            </div>
          </div>
        </div>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/products/:id'>
            <DetailedProductInfo
              addToCart={addToCart}
              cartItems={cartItems}
            />
          </Route>
          <Route path='/cart'>
            <ShoppingCart
              cartItems={cartItems}
              setCartItems={setCartItems}
              removeFromCart={removeFromCart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
