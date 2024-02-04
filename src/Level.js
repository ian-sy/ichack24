import React from 'react';
import { Button, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './Level.css';
import Map from './Map';

function Level({mapInfo}) {
    const [userInputs, setUserInputs] = React.useState([{value: ''}]);
    
    // Handler to add a new user input field
    const addNewUserInput = () => {
        setUserInputs([...userInputs, {value: ''}]);
    };
    
    const handleChange = e => {
        e.preventDefault();
        
        const index = e.target.id;
        setUserInputs(s => {
            const newArr = s.slice();
            newArr[index].value = e.target.value;
            console.log(newArr);
            return newArr;
        });
    };
    
    // Submit the user inputs by sending them as a POST request to the server
    const submitUserInputs = () => {
        fetch('http://localhost:5000/api/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInputs),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
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
            // height: '80%',
            width: '50%',
            border: '1px solid black',
            // maxHeight: "400pt",
            // overflowY: "scroll",
        }}>
        {userInputs.map((item, i) => {
            return (
                <Input
                placeholder='Type an instruction...'
                onChange={handleChange}
                value={item.value}
                id={i}
                type={item.type}
                size="40"
                style={{
                    margin: '1%',
                    width: '60%',
                    // padding: '5%',
                }}
                />
                );
            })}
            <Button onClick={addNewUserInput} style= {{backgroundColor: "black"}} shape='circle' icon={<PlusOutlined style={{color: "white"}}/>}/>
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
            <Map mapInfo={mapInfo} editor={false} />
            </div>
            <Button onClick={submitUserInputs} style={{
                width: "50%", borderColor: "#d3d3d3", borderRadius: "20px", backgroundColor:"black",color:"white"
            }}>Submit</Button>
            </div>
            </div>
            );
    }
    
export default Level;
    