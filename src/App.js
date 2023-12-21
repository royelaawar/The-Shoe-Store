import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components.js/Navbar';
import Home from './Components.js/Home';
import Cart from './Components.js/Cart';
import User from './Components.js/UserProfile';
import { useEffect, useState } from 'react';

//backend vars
const URL = "/api"
const POST_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

function App() {

  const [shoes, setShoes] = useState([])
  const [user, setUser] = useState([])
  const [cartItems, setCartItems] = useState([]);
  
  const addToCart = (newItem) => {
    setCartItems((prevItems) => [...prevItems, newItem]);
  };
  
  //maintains current user session
  const URL = "http://127.0.0.1:5555/api";

useEffect(() => {
  fetch(URL + '/products')
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Failed to fetch products');
      }
    })
    .then(shoes => {
      setShoes(shoes);
    })
    .catch(error => {
      console.error("Error fetching products:", error);
    });
}, []); 

  //gets products/sneakers data for home/main page
  useEffect(() => {
    fetch(URL + '/products')
    .then(res => {
      if (res.ok) {
        res.json().then(shoes =>
          setShoes(shoes)
        )
      };
    });
  }, []); 


// handle signup function (needs formdata set up for input) //
function handleSignup() {
  fetch(URL + '/users', {
    method: 'POST',
    headers: POST_HEADERS,
    body: JSON.stringify()
  })
  .then(res => {
    if (res.ok) {
      return res.json(); 
    } else {
      throw new Error('Invalid sign up'); 
    }
  })
  .then(data => {
    setUser(data); 
  })
  .catch(error => {
    alert(error.message); 
  });
}

// handle login function (needs formdata set up for input) //
function handleLogin() {
  fetch(URL + '/login', {
    method: 'POST',
    headers: POST_HEADERS,
    body: JSON.stringify()
  })
  .then(res => {
    if (res.ok) {
      return res.json(); 
    } else {
      throw new Error('Invalid login'); 
    }
  })
  .then(data => {
    setUser(data); // Update state with the user data
  })
  .catch(error => {
    alert(error.message); // Alert if there's an error (e.g., invalid login)
  });
}


  // logs out current user/resets user useState() //
  function logout() {
    setUser(null)
    fetch(URL + '/logout', { method: "DELETE" })
  }

  

  return (
    <Router>
      <div className="App">    
            <Navbar />
            <div className='content'>
              <Routes>

                <Route path="/" element={<Home shoes={shoes} addToCart={addToCart}/>} />
                <Route path="/shoeProfile" element={<shoeProfile />} />
                <Route path="/userProfile" element={<User user={user} logout={logout} handleLogin={handleLogin} handleSignup={handleSignup}/>} />
                <Route path="/cart" element={<Cart cartItems={cartItems} />} />


              </Routes>
            </div>
       </div>     
    </Router>
  
  );
}

export default App;
