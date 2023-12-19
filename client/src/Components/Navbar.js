import React from 'react';
import '../index.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>The Shoe Store</h1>
            <div className="links">
                <a href="/">Home</a>
                <a href="/shoeProfile">Shoe Profile</a>
                <a href="/userProfile">User Profile</a>
                <a href="/cart">Cart</a>
            </div>
        </nav>
    );
}

export default Navbar;
