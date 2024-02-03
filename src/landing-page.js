import React from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(-45deg, #fc9690, #c582f2, #72c9e8, #60e6c7);
    background-size: 400% 400%;
    animation: ${props => props.animation} 10s ease infinite;
  }';

  const rotate = keyframes`
  0% {
    backgroundPosition: 0% 50%;
  }
  50% {
    backgroundPosition: 100% 50%;
  }
  100% {
    backgroundPosition: 0% 50%;
  }
`;


function App() {
    return (
        <>
          <GlobalStyle animation={rotate} />
          <div>Your content here</div>
        </>
      );
    
}

export default App;