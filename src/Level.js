import React from 'react';
import { Button, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './Level.css';
import Map from './Map';

function Level() {
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
        <Button onClick={addNewUserInput} shape='circle' icon={<PlusOutlined />}/>
        </div>
        <div style={{
            border: '1px solid red',
            width: '50%',
            height: 'fit-content',
        }}>
        <div style={{border: '1px solid blue'}}>
        <Map />
        </div>
        <Button onClick={submitUserInputs} type='primary'>Submit</Button>
        </div>
        </div>
        );
    }
    
export default Level;
    