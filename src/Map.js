import React, { useState, useEffect } from 'react';
import './Map.css';
import { useTransition, animated } from '@react-spring/web'

const Map = (props) => {
    const cellWidth = 45;
    const [state, setState] = useState(props)

    useEffect(() => {
        setState(props)
    }, [props])

    // let currGrid = props.mapInfo
    const mapDim = Math.sqrt(props.mapInfo.length)

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
    
    function onClick(index) {
        let newGrid = props.mapInfo
        newGrid[index] = (newGrid[index] + 1) % backgroundColor.length
        setState({mapInfo: newGrid})
    }
    
    console.log("HI", state.mapInfo.length, state.mapInfo)

    const backgroundColor = ["white", "black", "red", "blue", "green"]

    return (
        <div className="grid" style={{border: "solid 2px red", position: "relative"}}>
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
                                                                    border: "0.5px solid black"
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
            {/* <div class="player" style={boxStyle}></div> */}
        </div>
    );
};

export default Map;
