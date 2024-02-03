import React from 'react';
import { Button, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import logo from './logo.svg';
import './App.css';

function App() {
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

  return (
    <div className="App" style={{
      padding: '5%',
      display: 'flex',
      flexDirection: 'row',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '50%',
        border: '1px solid black',
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
      <Button onClick={console.log("SUBMIT!")} type='primary'>Submit</Button>
    </div>
    </div>
  );
}

export default App;
