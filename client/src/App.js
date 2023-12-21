import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Cart from './Components/Cart';
import User from './Components/UserProfile';
import ShoeProfile from './Components/ShoeProfile';
import { useState } from 'react';

function App() {
    const [cart, setCart] = useState([]);

    const addToCart = (shoe) => {
        setCart([...cart, shoe]);
    };

    const removeFromCart = (shoeId) => {
        setCart(cart.filter(shoe => shoe.id !== shoeId));
    };
  return (
    <Router>
      <div className="App">    
            <Navbar />
            <div className='content'>
              <Routes>

                  <Route path="/" element={<Home />} />
                  <Route path="/shoe/:id" element={<ShoeProfile addToCart={addToCart} />} />
                  <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
                  <Route path="/userProfile" element={<User />} />

              </Routes>
            </div>
       </div>     
    </Router>
  
  );
}

export default App;
