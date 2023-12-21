import React from 'react';

function Navbar() {

    return (
  
      <nav className="bg-zinc-700 p-4">
  
        <div className="container mx-auto">
  
          <div className="flex justify-between items-center">
  
            <div className="text-white font-bold text-xl">The Shoe Store</div>
  
            <div className="hidden md:flex space-x-4">
  
              <a href="/" className="text-white hover:text-gray-400">Home</a>
  
              <a href="/ShoePage" className="text-white hover:text-gray-400">Shoes</a>
  
              <a href="/userProfile" className="text-white hover:text-gray-400">User Profile</a>
  
              <a href="/cart" className="text-white hover:text-gray-400">Cart</a>
  
            </div>
  
          </div>
  
        </div>

      </nav>
  
    );
  
}
  
export default Navbar;