import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Cart from './Components/Cart';
import User from './Components/UserProfile';
import ShoePage from './Components/ShoePage';
import UserPanel from './Components/UserPanel';
import { useEffect, useState } from 'react';

//backend vars
const URL = "/api"
const POST_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

function App() {

  const [shoes, setShoes] = useState([])
  const [user, setUser] = useState(null)

  //maintains current user session
  useEffect(() => { 
    fetch(URL + "/check_session")
      .then((res) => {  
        if (res.ok) {
          res.json().then((user) => setUser(user));
        }
        else{
          res.json().then((error) => console.log(error));          
        }      
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
async function handleSignup(userInfo) {
  console.log(userInfo)
  const res = await fetch(URL + '/users', {
    method: 'POST',
    headers: POST_HEADERS,
    body: JSON.stringify(userInfo)
  })
  if (res.ok) {
    const data = await res.json()
    setUser(data)
  }
  else {
    alert('Invalid sign up')
  }
}

// handle login function (needs formdata set up for input) //
async function handleLogin(userInfo) {
  const res = await fetch(URL + '/login', {
    method: 'POST',
    headers: POST_HEADERS,
    body: JSON.stringify(userInfo)
  })
  if (res.ok) {
    const data = await res.json()
    setUser(data)
  }
  else {
    alert('Invalid login')
  }

  // fetch(URL + '/login', {
  //   method: 'POST',
  //   headers: POST_HEADERS,
  //   body: JSON.stringify()
  // })
  // .then(res => {
  //   if (res.ok) {
  //     return res.json(); 
  //   } else {
  //     throw new Error('Invalid login'); 
  //   }
  // })
  // .then(data => {
  //   setUser(data); // Update state with the user data
  // })
  // .catch(error => {
  //   alert(error.message); // Alert if there's an error (e.g., invalid login)
  // });
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

                <Route path="/" element={<UserPanel 
                currentUser={user}
                attemptLogin={handleLogin}
                attemptSignup={handleSignup}
                logout={logout} />}
                />
                <Route path="/ShoePage" element={<ShoePage shoes={shoes} />} />
                <Route path="/userProfile" element={<User user={user} logout={logout} handleLogin={handleLogin} handleSignup={handleSignup}/>} />
                <Route path="/cart" element={<Cart />} />

              </Routes>
            </div>
       </div>     
    </Router>
  
  );
}

export default App;
