const ShoeList = ({shoes}) => {

    return (
        <div className="shoe-list">
            {shoes.map((shoe) => (
                <div className="shoe-preview" key={shoe.id}>
                    <h1> BRAND</h1>
                    <h2>{shoe.brand}</h2>
                    <p> By {shoe.title} </p>
                </div>
            ))} 
            
        </div>
    );
}

export default ShoeList