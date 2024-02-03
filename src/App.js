import React from 'react';
import { Button } from 'antd';
import logo from './logo.svg';
import './App.css';

function App() {
  const [userInputs, setUserInputs] = React.useState([]);

  // Handler to add a new user input field
  const addNewUserInput = () => {
    setUserInputs([...userInputs, '']);
  };

  // const data = fetch("https://nqa4uferurysboicmqiasmu7rm0srnqb.lambda-url.eu-west-1.on.aws/", {
  //   method: "POST",
  //   body: JSON.stringify({
  //     userId: 1,
  //     title: "Fix my bugs",
  //     completed: false
  //   }),
  //   headers: {
  //     "Content-type": "application/json; charset=UTF-8"
  //   }
  // }).then(response => response.text());

  async function foo() {
    let obj;
  
    const res = await fetch("https://ga53d6ugxl.execute-api.eu-west-1.amazonaws.com/prod/simple-func", {
      method: "POST",
      body: JSON.stringify({
        userId: 1,
        title: "Fix my bugs",
        completed: false
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    })
    // console.log(res)
    obj = await res.json()
  
    console.log(obj)
    return obj
  }
  
  const data = foo();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload!!!
        </p>
        <Button type="primary">Button</Button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>
          {data.statusCode}
        </p>
      </header>
    </div>
  );
}

export default App;
