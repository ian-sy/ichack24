import React, { useState } from 'react';
import './Map.css';

const Map = () => {
    const cellWidth = 45;
    const rows = 5;
    const cols = 5;
    const [gridData] = useState([
        ['a', 'b', 'c', 'd', 'e'],
        ['f', 'g', 'h', 'i', 'j'],
        ['k', 'l', 'm', 'n', 'o'],
        ['p', 'q', 'r', 's', 't'],
        ['u', 'v', 'w', 'x', 'y']
    ]);

    const boxStyle = {
        position: 'absolute',
        bottom: '0',
        left: '0',
        width: cellWidth + 'px',
        height: cellWidth + 'px',
        backgroundColor: 'black',
        opacity: '1',
        zIndex: '1',
        border: 'solid white 5px',
        boxSizing: 'border-box',
    };

    return (
        <div className="grid" style={{border: "solid 2px red", position: "relative"}}>
            {gridData.map((row, rowIndex) => (
                <div key={rowIndex} className="row" style={{
                    display: "flex",
                    flexDirection: "row",
                }}>
                    {row.map((component, colIndex) => (
                        <div
                            key={colIndex}
                            className="cell"
                            style={{
                                width: cellWidth + "px",
                                height: cellWidth + "px",
                                border: "0.5px solid black",
                            }}
                        >
                            {component}
                        </div>
                    ))}
                </div>
            ))}
            <div class="player" style={boxStyle}></div>
        </div>
    );
};

export default Map;
