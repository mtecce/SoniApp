import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CombFilter from './components/CombFilter';
import MenuBar from './components/MenuBar';
import './App.css';

function App() {

  const noteDictionary = {
    0 : "A",
    1 : "A#",
    2 : "B",
    3 : "C",
    4 : "C#",
    5 : "D",
    6 : "D#",
    7 : "E",
    8 : "F",
    9 : "F#",
    10 : "G",
    11 : "G#"
  };

  const convertNoteFromValue = (num) => {
    let retString = "";
    let difVal = Math.abs(num%12);
    let octaveAdd = 4;
    if(num>0){
      octaveAdd += ((num - difVal) / 12);
      if(difVal > 2){
        octaveAdd++;
      }
    }else if(num<0){
      octaveAdd += ((num + difVal) / 12);
      if(difVal != 0){
        difVal = 12 - difVal;
        if(difVal<3){
          octaveAdd--;
        }
      }
    }
    retString = noteDictionary[difVal] + octaveAdd.toString();
    return retString;
  };

  const [currentreq, setcurreq] = useState("");
  const [soniStatus, setSoniStatus] = useState("active");

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

  const changeSoniStatus = () => {
    if(soniStatus === "active"){
      setSoniStatus("innactive");
    }else{
      setSoniStatus("active");
    }
  }

  

  return (
    <div className="App">
      <p>{currentreq}</p>
      <button onClick={() => changeSoniStatus()}>{soniStatus}</button>
      <MenuBar currentPage={"CombFilter"} currentStatus={soniStatus}/>
      <CombFilter 
        sendSoniReq={sendSoniRequest}
        getNote={convertNoteFromValue} 
        currentRequest={currentreq}
      />
    </div>
  );
}

export default App;
