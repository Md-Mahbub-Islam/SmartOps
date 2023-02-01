
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Layout from './components/Home/Layout';
import SpeechToText from './components/Home/SpeechToText';
import RealTimeMap from '.components/Home/map.js';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Layout />
      {/* <SpeechToText /> */}
    </div>
  );
}

export default App;
