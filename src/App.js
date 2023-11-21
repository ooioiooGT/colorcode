import './App.css';
import Color from "./Color"
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import ImageColor from './ImageColor';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Color />} />
          <Route path='/Image' element={<ImageColor />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
