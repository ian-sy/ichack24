import React from 'react';
import { Button, Input, Alert, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './Level.css';
import Map from './Map';
import { evaluateUserInput } from './gpt.js';

const { TextArea } = Input;

function Level({mapInfo}) {
    const [userInput, setUserInput] = React.useState("");
    const [lastResult, setLastResult] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    
    const handleChange = e => {
        e.preventDefault();
        console.log("value", e.target.value);
        setUserInput(s => e.target.value);
    };

    // Convert a list of movement instructions into a list of coordinates
    // Also pad the map to be surrounded by Xs
    const convertTo2DAndPad = (mapInfo) => {
        let map = []
        let row = []

        // Convert to 2D
        for (let i = 0; i < mapInfo.length; i++) {
            if (i % Math.sqrt(mapInfo.length) === 0 && i !== 0) {
                map.push(row);
                row = [];
            }
            row.push(mapInfo[i]);
        }
        map.push(row);

        // Pad the map
        let paddedMap = []
        for (let i = 0; i < map.length + 2; i++) {
            if (i === 0 || i === map.length + 1) {
                paddedMap.push(Array(map[0].length + 2).fill('X'))
            } else {
                paddedMap.push(['X', ...map[i - 1], 'X'])
            }
        }
        console.log(paddedMap)
        return paddedMap;
    }
    
    // Submit the user inputs by sending them as a POST request to the server
    const submitUserInputs = () => {
        setLoading(true);
        console.log("submitting user input", userInput)
    //     fetch('http://localhost:5000/api/submit', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({value: userInput}),
    // })
        evaluateUserInput(convertTo2DAndPad(mapInfo), userInput)
        .then(response => {
            setLoading(false)
            setLastResult(response)
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    function makeGrid(dim) {
        let grid = []
        for (let i = 0; i < dim * dim; i++) {
            grid.push(0)
        }
        return grid;
    }


    return (
        <div className="Level" style={{
            padding: '5%',
            display: 'flex',
            flexDirection: 'row',
        }}>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '50%',
            paddingTop: "4%",
        }}>
                <TextArea
                placeholder='Type step-by-step instructions.'
                onChange={handleChange}
                autoSize={{ minRows: 3, maxRows: 6 }}
                value={userInput}
                // id={i}
                size="40"
                style={{
                    margin: '1%',
                    width: '80%',
                    // padding: '5%',
                }}
                />
                <Button onClick={submitUserInputs} disabled={loading}style={{marginTop: "3%",
                width: "50%", borderColor: "#d3d3d3", borderRadius: "20px", backgroundColor:"black",color:"white"
                }}>
                    {loading ? <Spin size="small" /> : "Submit"}
                </Button>
            {!lastResult ? 
                <Alert
                    style={{textAlign: "left", margin: "5%", width: "80%"}}
                    message="The AI marker is not always reliable."
                    description=" Please speak with your teacher if you believe it has made a mistake."
                    type="info"
                    showIcon
                /> :
            (lastResult.status ?
                <Alert
                    style={{textAlign: "left", margin: "5%", width: "80%"}}
                    message="Correct!"
                    type="success"
                    showIcon
                /> :
                <Alert
                    style={{textAlign: "left", margin: "5%", width: "80%"}}
                    message="Sorry, something's not quite right."
                    description={lastResult.result + "\nPlease speak with your teacher if you believe the AI marker has made a mistake."}
                    type="error"
                    showIcon
                />
            )
            
        
            }
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyItems: 'center',
                alignItems: 'center',
                width: '50%',
                height: 'fit-content',
            }}>
            <div style={{margin: '5%'}}>
            <Map mapInfo={mapInfo} editor={false} coordsToPlot={null} />
            </div>
            </div>
            </div>
            );
    }
    
export default Level;
    