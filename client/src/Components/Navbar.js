import React from 'react';
import '../index.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>The Shoe Store</h1>
            <div className="links">
                <Link to="/">Home</Link>
                
                <Link to="/userProfile">User Profile</Link>
                <Link to="/cart">Cart</Link>
            </div>
        </nav>
    );
}

export default Navbar;
