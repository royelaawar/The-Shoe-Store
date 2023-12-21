import { useState } from "react";
import ShoeList from "./ShoeList";

const Home = () => {

    const [ shoes, setNewShoes ] = useState([
        { title: 'NIKE', brand: 'Airforce', id: 1},
        { title: 'ADIDAS', brand: 'Classic', id: 2}
    ]);

    return (
        <div className="home">
            <ShoeList shoes={shoes} />
        </div>
    );
}

export default Home;
