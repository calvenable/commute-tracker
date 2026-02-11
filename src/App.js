import logo from './logo.svg';
import './App.css';
import ExampleMap from './components/ExampleMap';
import "leaflet/dist/leaflet.css";

function App() {
  return (
    <div className="App">
      <h2>Your Location:</h2>
      <ExampleMap />
    </div>
  );
}

export default App;
