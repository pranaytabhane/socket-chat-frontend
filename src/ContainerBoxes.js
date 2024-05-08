import React from 'react';
import './styles.css'; // Import the CSS file we created

function ContainerBoxes({messages}) {
    function getRandomColor() {
        // Generate random RGB values
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
    
        // Return the RGB color as a string
        return `rgb(${r},${g},${b})`;
    }

    const generateBoxes = () => {
        const boxes = [];
        for (const room in messages) {
            boxes.push(
                <div key={room} className="box">
                    <b>{room}</b> {/* Heading */}
                    {messages[room].map((text, index) => (
                        <div key={index} className="box-content" style={{ backgroundColor: getRandomColor() }}>
                            {text}
                        </div>
                    ))}
                </div>
            );
        }
        return boxes;
    };
    return (
        <>
            <div className="container">
                {Object.keys(messages).length > 0 && generateBoxes()}
            </div>
        </>
    
    );
}

export default ContainerBoxes;
