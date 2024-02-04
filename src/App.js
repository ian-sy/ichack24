import Home from './Home';
import LevelPage from './LevelPage';
import Level from './Level';
import Generate from './Generate';
import {Route, Routes} from "react-router-dom";
import './App.css';

function App() {
  return (
    <div style={{
        width: "100%",
        height: "100%",
        // display: "flex",
    }}>
        <Routes>
            <Route path = "/" element={<Home />} />
            <Route path = "/levels" element={<LevelPage />} />
            <Route path = "/level/1" element={<Level mapInfo={
                [0, 0, 0, 1, 0,
                 0, 1, 0, 1, 0,
                 0, 1, 0, 1, 0,
                 0, 1, 0, 0, 0, 
                 0, 1, 1, 1, 1]
            }/>} />
            <Route path = "/teacher" element={<Generate />} />
        </Routes>
    </div>
  );
}

export default App;