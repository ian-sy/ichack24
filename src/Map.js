import React, { useState } from 'react';
import './Map.css';
import { useSpring, animated } from '@react-spring/web';


const Map = () => {
    const cellWidth = 75;
    const rows = 5;
    const cols = 5;
    const [gridData] = useState([
        ['a', 'b', 'c', 'd', 'e'],
        ['f', 'g', 'h', 'i', 'j'],
        ['k', 'l', 'm', 'n', 'o'],
        ['p', 'q', 'r', 's', 't'],
        ['u', 'v', 'w', 'x', 'y']
    ]);


    // Convert a list of movement instructions into a list of coordinates
    const convertToCoordinates = (instructions) => {
        let current_orientation = 0;

        const coordinates = [];
        let left_offset = 0;
        let top_offset = 0;
        for (let i = 0; i < instructions.length; i++) {
            if (instructions[i] === 'R') {
                current_orientation = (current_orientation + 1) % 4;
            } else if (instructions[i] === 'B') {
                current_orientation = (current_orientation + 2) % 4;
            } else if (instructions[i] === 'L') {
                current_orientation = (current_orientation + 3) % 4;
            } 
            let result = moveForward(left_offset, top_offset, current_orientation)
            coordinates.push(result);

            left_offset = result.x;
            top_offset = result.y;
        }
        return coordinates;
    }

    function moveForward(current_x, current_y, current_orientation) {
        if (current_orientation === 0) {
            current_y += cellWidth;
        }
        else if (current_orientation === 1) {
            current_x += cellWidth;
        }
        else if (current_orientation === 2) {
            current_y -= cellWidth;
        }
        else if (current_orientation === 3) {
            current_x -= cellWidth;
        }
        return {
            x: current_x,
            y: current_y,
            facing: current_orientation,
        }
    }

    const springs = useSpring({
        from: { background: "#ff6d6d", bottom: 0, left: 0, rotate: "0deg" },
        to: async (next, cancel) => {
          for (const coordinate of convertToCoordinates(['F', 'R', 'F', 'R', 'L', 'F', 'L'])) {
            console.log(coordinate);
            await next({ rotate: (coordinate.facing * 90) + "deg", background: "#ff6d6d" });

            await next({ left: coordinate.x, background: "#ff6d6d" });
            await next({ bottom: coordinate.y, background: "#ff6d6d" });
            // await next({ rotate: "180deg", background: "#ff6d6d" });
            // await next({ left: coordinate[0], background: "#ff6d6d" });
            // await next({ rotate: "270deg", background: "#ff6d6d" });
            // await next({ bottom: coordinate[1], background: "#ff6d6d" });
            // await next({ rotate: "360deg", background: "#ff6d6d" });
        }
        //   await next({ left: 80, background: "#fff59a" });
        //   await next({ rotate: "90deg", background: "#ff6d6d" });
        //   await next({ bottom: 40, background: "#88DFAB" });
        //   await next({ rotate: "180deg", background: "#ff6d6d" });
        //   await next({ left: 200, background: "#569AFF" });
        //   await next({ rotate: "270deg", background: "#ff6d6d" });
        //   await next({ bottom: -40, background: "#ff6d6d" });
        //   await next({ rotate: "360deg", background: "#ff6d6d" });
        },
        loop: false,
      });

    
    const boxStyle = {
        position: 'absolute',
        justifySelf: 'center',
        bottom: '0',
        left: '0',
        width: cellWidth + 'px',
        height: cellWidth + 'px',
        backgroundColor: 'black',
        opacity: '1',
        zIndex: '1',
        boxSizing: 'border-box',
        borderRadius: "8px",
        ...springs,
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
                                boxSizing: "border-box",
                            }}
                        >
                            {component}
                        </div>
                    ))}
                </div>
            ))}
            <animated.div class="player" style={boxStyle}></animated.div>
        </div>
    );
};

export default Map;
