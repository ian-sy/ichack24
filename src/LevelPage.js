import React from 'react'
import { Button, Flex } from 'antd';
import './LevelPage.css';
import './Home.css'
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

function LevelPage() {
    
    const navigate = useNavigate();

    function handleClick_back(){
        navigate("/")
    }

    return(
        <div className="login-background" style={{ width: "100%", height: "100%"}}> 
        <div className="center-container">
        <div className='login-container'>
            {/* Vertical level buttons */}
            <div style={{ marginBottom: '10px' }}> 
            <Button onClick = {handleClick_back} type="primary" shape="circle" icon={<LeftOutlined />}></Button>
            </div>
            <Flex gap="small" align="flex-start" vertical>
            <Button onClick={() => navigate("/level/1")} style={{
            width: "100%", borderColor: "#d3d3d3", borderRadius: "20px", 
        }}>Level 1</Button>
            <Button style={{
            width: "100%", borderColor: "#d3d3d3", borderRadius: "20px", 
        }}>Level 2</Button>
            <Button style={{
            width: "100%", borderColor: "#d3d3d3", borderRadius: "20px", 
        }}>Level 3</Button>
            </Flex>

        </div>
        </div>
        </div>
    )
}

export default LevelPage;