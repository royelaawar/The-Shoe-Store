import { Link } from 'react-router-dom';

const ShoeList = ({ shoes }) => {
    return (
        <div className="shoe-list">
            {shoes.map((shoe) => (
                <div className="shoe-preview" key={shoe.id}>
                    <h2>{shoe.brand}</h2>
                    <Link to={`/shoe/${shoe.id}`}>
                        <p>{shoe.title}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default ShoeList;



