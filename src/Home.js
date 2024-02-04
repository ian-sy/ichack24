import React from 'react';
import {Button, Flex} from 'antd'
import { useNavigate } from 'react-router-dom'
import './Home.css'

function Home(){

    const navigate = useNavigate();

function handleClick(){
    navigate("/levels")
}

return(
    <div className="login-background" style={{ width: "100%", height: "100%"
        // border: "solid 2px red",
        // width: "100%",
        // height: "100%"
    }}>
    <div className="login-container">
        <Flex gap="small" align="flex-start" vertical style={{width: "100%"}}>
        <Button onClick={handleClick} style={{
            width: "100%", borderColor: "#d3d3d3", borderRadius: "20px", 
        }}>Play</Button>
        <Button style={{
            width: "100%", borderColor: "#d3d3d3", borderRadius: "20px", 
        }}>Teacher</Button>
        </Flex>
    </div>
    </div>
)
}
  export default Home;