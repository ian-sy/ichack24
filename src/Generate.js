import React, { useEffect } from 'react';
import { Col, InputNumber, Row, Slider, Space } from 'antd';
import Map from './Map';

function Generate() {

    const [gridDimensions, setGridDimensions] = React.useState(5);

    const onChange = (newValue) => {
        setGridDimensions(newValue);
    };

    function makeGrid(dim) {
        let grid = []
        for (let i = 0; i < dim * dim; i++) {
            grid.push(0)
        }
        return grid;
    }

return (
    <div>
        <Row>
        <Col span={12}>
            <Slider
            min={5}
            max={7}
            onChange={onChange}
            value={gridDimensions}
            />
        </Col>
        <Col span={4}>
            <InputNumber
            min={5}
            max={7}
            style={{ margin: '0 16px' }}
            value={gridDimensions}
            onChange={onChange}
            />
        </Col>
        </Row>
    <div style={{
        border: '5px solid red',
        width: '50%',
        height: 'fit-content',
    }}>
    <div style={{border: '1px solid blue'}}>
    <Map mapInfo={makeGrid(gridDimensions)} editor={true}/>
    </div>
    </div>
    </div>
    // <div className="App" style={{
    //     padding: '5%',
    //     display: 'flex',
    //     flexDirection: 'row',
    // }}>
    // <div style={{
    //     display: 'flex',
    //     flexDirection: 'column',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     // height: '80%',
    //     width: '50%',
    //     border: '1px solid black',
    //     // maxHeight: "400pt",
    //     // overflowY: "scroll",
    // }}>
    // {userInputs.map((item, i) => {
    //     return (
    //         <Input
    //         placeholder='Type an instruction...'
    //         onChange={handleChange}
    //         value={item.value}
    //         id={i}
    //         type={item.type}
    //         size="40"
    //         style={{
    //             margin: '1%',
    //             width: '60%',
    //             // padding: '5%',
    //         }}
    //         />
    //         );
    //     })}
    //     <Button onClick={addNewUserInput} shape='circle' icon={<PlusOutlined />}/>
    //     </div>
    //     <div style={{
    //         border: '1px solid red',
    //         width: '50%',
    //         height: 'fit-content',
    //     }}>
    //     <div style={{border: '1px solid blue'}}>
    //     <Map />
    //     </div>
    //     <Button onClick={submitUserInputs} type='primary'>Submit</Button>
    //     </div>
    //     </div>
        );
    }
    
    export default Generate;
    