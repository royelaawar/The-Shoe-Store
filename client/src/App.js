import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Cart from './Components/Cart';
import User from './Components/UserProfile';
import ShoeProfile from './Components/ShoeProfile';

function App() {
  return (
    <Router>
      <div className="App">    
            <Navbar />
            <div className='content'>
              <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/shoeProfile" element={<ShoeProfile />} />
                <Route path="/userProfile" element={<User />} />
                <Route path="/cart" element={<Cart />} />

              </Routes>
            </div>
       </div>     
    </Router>
  
  );
}

export default App;
