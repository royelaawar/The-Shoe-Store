import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components.js/Navbar';
import Home from './Components.js/Home';
import Cart from './Components.js/Cart';
import User from './Components.js/UserProfile';
import { useEffect, useState } from 'react';



function App() {

  const [shoes, setShoes] = useState([])

  useEffect(() => {
    fetch("http://localhost:5555/products")
    .then(res => res.json())
    .then(shoeData => {
      setShoes(shoeData)
      console.log(shoeData)
    })
  },[])

  return (
    <Router>
      <div className="App">    
            <Navbar />
            <div className='content'>
              <Routes>

                <Route path="/" element={<Home shoes={shoes}/>} />
                <Route path="/shoeProfile" element={<shoeProfile />} />
                <Route path="/userProfile" element={<User />} />
                <Route path="/cart" element={<Cart />} />

              </Routes>
            </div>
       </div>     
    </Router>
  
  );
}

export default App;
