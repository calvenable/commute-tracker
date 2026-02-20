import './App.css';
import UserTrackingMap from './components/UserTrackingMap';
import TrackerMap from './components/TrackerMap';
import Timer from './components/Timer';
import {useState} from 'react';
// import TestComponent from './components/Test';
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

function App() {
  const [showTool, setShowTool] = useState(true);
  const [tools, setTools] = useState(null);

  function toggleRectangle() {
    if (showTool) {
      setTools({
        rectangle: false,
        polygon: false,
        polyline: false,
        circle: true,
        circlemarker: false,
        marker: false,
      });
    } else {
      setTools({
        rectangle: false,
        polygon: true,
        polyline: false,
        circle: false,
        circlemarker: false,
        marker: false,
      });
    }
    setShowTool((prev) => !prev);
  }

  return (
    <div className="App">
      <h2>Commute Tracker v0.1.1</h2>
      <TrackerMap tools={tools}/>
      <Timer toggleAction={toggleRectangle}/>
    </div>
  );
}

export default App;
