const Navbar = () => {
    return (
        <nav className="navbar">
            <h1 style={{ fontSize: '48px', fontWeight: 'bold' }}>The Shoe Store</h1>
            <div className="links">
                <a href="/" style={{
                    color: "white",
                    backgroundColor: '#f1356d',
                    borderRadius: '8px'
                }}>Home </a>
                <a href="/shoeProfile" style={{
                    color: "white",
                    backgroundColor: '#f1356d',
                    borderRadius: '8px'
                }}>Shoe Profile</a>
                <a href="/userProfile" style={{
                    color: "white",
                    backgroundColor: '#f1356d',
                    borderRadius: '8px'
                }}>User Profile</a>
                <a href="/cart" style={{
                    color: "white",
                    backgroundColor: '#f1356d',
                    borderRadius: '8px'
                }}>Cart</a>
            </div>
        </nav>
    );
}

export default Navbar;