import React, { useState } from "react";

const ShoeProfile = () => {
    const shoes = [
        { 
            name: "Air Force 1", 
            content: [
                { type: 'image', url: 'https://static.footshop.com/img/p/1/3/3/7/9/13379-full_product.jpg' },
                { type: 'image', url: 'https://i5.walmartimages.com/seo/Nike-Air-Force-1-07-Men-s-Basketball-Shoes-Size-10_04fd782a-466a-4e7d-8028-abfd27a21db5_1.d84956ef0fd4d07e9d25b1b34b264567.jpeg' },
                { type: 'image', url: 'https://productimages.footy.com/626465bf2510ba193db45619/10/3840.webp?q=75' },
                { type: 'video', url: 'https://www.youtube.com/embed/IqgBn7sT6vI' }
            ] 
        },
       
    ];

    console.log(shoes)

    const [currentShoeIndex, setCurrentShoeIndex] = useState(0);
    const [currentContent, setCurrentContent] = useState(shoes[0].content[0]);


    const selectContent = (content) => {
        setCurrentContent(content);
    };

    const currentShoe = shoes[currentShoeIndex];

    return (
        <div className="shoe-container">
            <div className="shoe-thumbnails">
                {currentShoe.content.map((item, index) => (
                    item.type === 'image' ? (
                        <img
                            key={index}
                            src={item.url}
                            alt={`Shoe ${currentShoe.name} ${index}`}
                            onClick={() => selectContent(item)}
                            className="thumbnail-image"
                        />
                    ) : (
                        <iframe
                            key={index}
                            src={item.url}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="thumbnail-video"
                        ></iframe>
                    )
                ))}
            </div>
            <div className="shoe-profile">
                <h2>{currentShoe.name}</h2>
                {currentContent.type === 'image' ? (
                    <img
                        src={currentContent.url}
                        alt="Selected Shoe"
                        className="selected-shoe-image"
                    />
                ) : (
                    <iframe
                        src={currentContent.url}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="selected-video"
                    ></iframe>
                )}
            </div>
        </div>
    );
};

export default ShoeProfile;