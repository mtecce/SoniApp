import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CombFilter from './components/CombFilter';
import './App.css';

function App() {

  const [currentreq, setcurreq] = useState("");

  const sendSoniRequest = (sendData) => {
    axios({
      method: "get",
      url:"/_soniReq",
      params: sendData
    })
    .then((response) => {
      if (!currentreq){
        setcurreq(response.data["directory"]);
        console.log(currentreq);
      }else if(response.data["directory"] == currentreq){
        console.log("bypass");
        requestPreviousResults();
      }
    });
  };

  const requestPreviousResults = () => {
    axios({
      method: "get",
      url:"/_prevresults"
    })
    .then((response) => {
      console.log(response.data["results"]);
    });
  };

  useEffect(() => {
    console.log(currentreq);
  },[currentreq]);

  

  return (
    <div className="App">
      <p>{currentreq}</p>
      <CombFilter sendSoniReq={sendSoniRequest}/>
    </div>
  );
}

export default App;
