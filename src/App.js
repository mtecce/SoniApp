import {useState} from 'react';

import {useQuery} from 'react-query';
import axios from 'axios';

import CombFilter from './components/CombFilter';

import './App.css';

function App() {

  const sendSoniRequest = (sendData) => {
    axios({
      method: "get",
      url:"/_soniReq",
      params: sendData
    })
    .then((response) => {
      return response.data['directory']
    });
  };


  return
  (
    <div className="App">
      <CombFilter sendSoniReq={sendSoniRequest}/>
    </div>
  );
}

export default App;
