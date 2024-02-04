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
    }}>
        <Routes>
            <Route path = "/" element={<Home />} />
            <Route path = "/levels" element={<LevelPage />} />
            <Route path = "/level/1" element={<Level mapInfo={
                ["O", "O", "O", "O", "E",
                 "O", "X", "X", "X", "O",
                 "O", "X", "O", "X", "O",
                 "O", "X", "O", "O", "O", 
                 "S", "X", "X", "X", "X"]
            }/>} />
            <Route path = "/teacher" element={<Generate />} />
        </Routes>
    </div>
  );
}

export default App;