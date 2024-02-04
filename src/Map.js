import React, { useState, useEffect } from 'react';
import './Map.css';
import { useSpring, animated } from '@react-spring/web'

const Map = (props) => {
    const cellWidth = 65;
    const [state, setState] = useState(props)

    useEffect(() => {
        setState(props)
    }, [props])

    // let currGrid = props.mapInfo
    const mapDim = Math.sqrt(props.mapInfo.length)


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
        from: { bottom: 0, left: 0, rotate: "0deg" },
        to: async (next, cancel) => {
          for (const coordinate of convertToCoordinates(['F', 'R', 'F', 'R', 'L', 'F', 'L'])) {
            console.log(coordinate);
            await next({ rotate: (coordinate.facing * 90) + "deg" });

            await next({ left: coordinate.x, });
            await next({ bottom: coordinate.y, });
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
        // width: cellWidth + 'px',
        // height: cellWidth + 'px',
        width: 0, 
        height: 0, 
        borderLeft: (cellWidth / 2) + 'px solid transparent',
        borderRight: (cellWidth / 2) + 'px solid transparent',
        borderBottom: (cellWidth / 1) + 'px solid #ff6d6d',
        opacity: '1',
        zIndex: '1',
        boxSizing: 'border-box',
        // borderRadius: "10px",
        ...springs,
    };
    
    function onClick(index) {
        let newGrid = props.mapInfo
        newGrid[index] = (newGrid[index] + 1) % backgroundColor.length
        setState({mapInfo: newGrid})
    }
    
    console.log("HI", state.mapInfo.length, state.mapInfo)

    const backgroundColor = {
        "S": "green",
        "O": "white",
        "X": "black",
        "E": "purple",
        "Y": "yellow",
        "R": "red",
    }

    return (
        <div className="grid" style={{position: "relative"}}>
            {(() => {
                const finalGeneration = []
                for (let i = 0; i < mapDim; i++) {   
                    finalGeneration.push(
                                            <div key={i} className="row" style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            }}> 
                                                    {(() => {
                                                        const gridGeneration = []
                                                        for (let j = 0; j < mapDim; j++) {
                                                            gridGeneration.push(<div
                                                                key={j}
                                                                className="cell"
                                                                onClick={props.editor ? (() => onClick(i * mapDim + j)) : (() => {})}
                                                                style={{
                                                                    backgroundColor: backgroundColor[state.mapInfo[i * mapDim + j]],
                                                                    width: cellWidth + "px",
                                                                    height: cellWidth + "px",
                                                                    border: "0.5px solid #d3d3d3",
                                                                    boxSizing: "border-box",
                                                                }}
                                                            >
                                                                
                                                            </div> )
                                                        }
                                                        return (gridGeneration)})()}
                                            </div>
                                            
                    )
                }
                return (
                    <div>
                        {finalGeneration}
                        </div>
                )
                            }
                            )()}
            <animated.div className="player" style={boxStyle}></animated.div>
        </div>
    );
};
export default Map;
