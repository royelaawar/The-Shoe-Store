import React, {useState} from "react";

const ShoeProfile = () => {

    const shoeImages = [

        './Components.js/Images/nike1.png',
        './Components.js/Images/nike2.png'
    ];

    return (
        <div className="shoeprofile">
            <h2>Shoe Profile</h2>
            <img 
                src={shoeImages} 
                alt="Shoe" 
                onClick={switchShoeImage} 
                className="shoe-image"
            />
        </div>
    );
}

export default ShoeProfile