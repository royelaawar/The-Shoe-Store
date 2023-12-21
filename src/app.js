import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Cart from './components/Cart';
import User from './components/UserProfile';
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