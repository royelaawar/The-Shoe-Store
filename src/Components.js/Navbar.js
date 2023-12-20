import React from 'react';

// const Navbar = () => {
//     return (
//         <nav className="navbar">
//             <h1 style={{ fontSize: '48px', fontWeight: 'bold' }}>The Shoe Store</h1>
//             <div className="links">
//                 <a href="/" style={{
//                     color: "white",
//                     backgroundColor: '#f1356d',
//                     borderRadius: '8px'
//                 }}>Home </a>
//                 <a href="/shoeProfile" style={{
//                     color: "white",
//                     backgroundColor: '#f1356d',
//                     borderRadius: '8px'
//                 }}>Shoe Profile</a>
//                 <a href="/userProfile" style={{
//                     color: "white",
//                     backgroundColor: '#f1356d',
//                     borderRadius: '8px'
//                 }}>User Profile</a>
//                 <a href="/cart" style={{
//                     color: "white",
//                     backgroundColor: '#f1356d',
//                     borderRadius: '8px'
//                 }}>Cart</a>
//             </div>
//         </nav>
//     );
// }

function Navbar() {

    return (
  
      <nav className="bg-zinc-700 p-4">
  
        <div className="container mx-auto">
  
          <div className="flex justify-between items-center">
  
            <div className="text-white font-bold text-xl">The Shoe Store</div>
  
            <div className="hidden md:flex space-x-4">
  
              <a href="/" className="text-white hover:text-gray-400">Home</a>
  
              <a href="/shoeProfile" className="text-white hover:text-gray-400">Shoes</a>
  
              <a href="/userProfile" className="text-white hover:text-gray-400">User Profile</a>
  
              <a href="/cart" className="text-white hover:text-gray-400">Cart</a>
  
            </div>
  
          </div>
  
        </div>

      </nav>
  
    );
  
}
  
export default Navbar;