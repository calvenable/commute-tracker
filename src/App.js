import './App.css';
import ExampleMap from './components/ExampleMap';
import Timer from './components/Timer'
import "leaflet/dist/leaflet.css";

function App() {
  return (
    <div className="App">
      <h2>Commute Tracker</h2>
      <ExampleMap />
      <Timer />
    </div>
  );
}

export default App;
