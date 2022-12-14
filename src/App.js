import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Logs from './components/Logs';
import Menu from './components/Menu';
import Motos from './components/Motos'

function App() {
  return (
    <Router>
      <div className='container'>
        <Routes>
          <Route path="/" element={<Menu/>}/>
          <Route path="/motos" element={<Motos/>}/>
          <Route path="/logs" element={<Logs/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
