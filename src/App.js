import Home from './Home';
import LevelPage from './LevelPage';
import Level from './Level';
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
            <Route path = "/level/1" element={<Level />} />
        </Routes>
    </div>
  );
}

export default App;