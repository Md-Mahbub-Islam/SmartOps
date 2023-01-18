
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Layout from './components/Home/Layout';
import SpeechToText from './components/Home/SpeechToText';


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
