import {useState} from 'react';

import CombFilter from './components/CombFilter';

import './App.css';

function App() {

  const [currentReq, setCurrentReq] = useState('');


  return
  (
    <div className="App">
      <CombFilter/>
    </div>
  );
}

export default App;
