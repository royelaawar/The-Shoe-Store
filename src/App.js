import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components.js/Navbar';
import Home from './Components.js/Home';
import Cart from './Components.js/Cart';
import User from './Components.js/UserProfile';

function App() {
  return (
    <Router>
      <div className="App">    
            <Navbar />
            <div className='content'>
              <Routes>

                <Route path="/" element={<Home />} />
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
