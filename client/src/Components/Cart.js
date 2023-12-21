// const Cart = ({ cart, removeFromCart }) => {
//     const total = cart.reduce((acc, shoe) => acc + shoe.price, 0);

//     return (
//         <div className="cart-container">
//             <div className="cart-items">
//                 <h2>Your Cart Items</h2>
//                 {cart.length === 0 ? (
//                     <p>Your cart is empty.</p>
//                 ) : (
//                     cart.map((shoe, index) => (
//                         <div key={index} className="cart-item">
//                             <h3>{shoe.name}</h3>
//                             <p>Price: ${shoe.price.toFixed(2)}</p>
//                             <button onClick={() => removeFromCart(shoe.id)} className="remove-button">Remove</button>
//                         </div>
//                     ))
//                 )}
//             </div>
//             <div className="cart-summary">
//                 <h3>Summary</h3>
//                 <p>Total: ${total.toFixed(2)}</p>
//                 <button className="checkout-button">Checkout</button>
//             </div>
//         </div>
//     );
// };

// export default Cart;

const Cart = ({ cart, removeFromCart }) => {
    const total = cart.reduce((acc, shoe) => acc + shoe.price, 0);
    const taxes = total * 0.1; // Example tax calculation (10%)

    return (
        <div className="bg-gray-100 h-screen py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-3/4">
                        {cart.length === 0 ? (
                            <p>Your cart is empty.</p>
                        ) : (
                            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                                <table className="w-full">
                                    <thead>
                                        <tr>
                                            <th className="text-left font-semibold">Product</th>
                                            <th className="text-left font-semibold">Price</th>
                                            <th className="text-left font-semibold">Quantity</th>
                                            <th className="text-left font-semibold">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.map((shoe, index) => (
                                            <tr key={index}>
                                                <td className="py-4">
                                                    <div className="flex items-center">
                                                        {/* Replace with actual image if available */}
                                                        <img className="h-16 w-16 mr-4" src="https://via.placeholder.com/150" alt="Product image" />
                                                        <span className="font-semibold">{shoe.name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4">${shoe.price.toFixed(2)}</td>
                                                <td className="py-4">1</td> {/* Replace with actual quantity if available */}
                                                <td className="py-4">${shoe.price.toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                    <div className="md:w-1/4">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-lg font-semibold mb-4">Summary</h2>
                            <div className="flex justify-between mb-2">
                                <span>Subtotal</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Taxes</span>
                                <span>${taxes.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Shipping</span>
                                <span>$0.00</span> {/* Update as needed */}
                            </div>
                            <hr className="my-2" />
                            <div className="flex justify-between mb-2">
                                <span className="font-semibold">Total</span>
                                <span className="font-semibold">${(total + taxes).toFixed(2)}</span>
                            </div>
                            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;


