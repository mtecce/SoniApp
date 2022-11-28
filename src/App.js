import React, {useState, useEffect} from 'react';
import axios from 'axios';
import PageSelector from './components/PageSelector';
import MenuBar from './components/MenuBar';
import {PreviousRequests,ResultsContent} from './components/RequestsAndResults';
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

  const convertNote = (num) => {
    num = parseInt(num);
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
      if(difVal !== 0){
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
  const [currentPage, setCurrentPage] = useState("Home");
  const [currentResult, setCurrentResult] = useState("Create New");
  const [audioSrc, setAudioSrc] = useState("");
  const [prevreqs, setprevreqs] = useState({});
  const [soniStatus, setSoniStatus] = useState("innactive");

  useEffect(() => {
    requestPreviousResults();
  },[]);


  const sendSoniRequest = (sendData) => {
    setSoniStatus("active");
    axios({
      method: "get",
      url:"/_soniReq",
      params: sendData
    })
    .then((response) => {
      if (!currentreq){
        //there is no requests, memory must have been wiped
        setcurreq(response.data["directory"]);
        console.log(currentreq);
      }else if(response.data["directory"] === currentreq){
        //the previous request was identical to the current request
        console.log("accidental repeat request");
      }else{
        //there existed an identical request saved in memory
        console.log("New Request Made, or Old Request Loaded");
      }
      setSoniStatus("innactive");
      requestPreviousResults();
    });
  };

  const requestPreviousResults = () => {
    axios({
      method: "get",
      url:"/_prevresults"
    })
    .then((response) => {
      setprevreqs(response.data["results"]);
    });
  };

  async function requestAudioFile() {

    const {data} = await axios("/_audio", {responseType: "blob"});

    console.log(data);

    let newurl = URL.createObjectURL(data);

    console.log(newurl);

    setAudioSrc(newurl);

    return data;

    // axios({
    //   method: "get",
    //   url:"/_audio",
    //   responseType:"blob"
    // })
    // .then((response) => {
    //   console.log(typeof(response));
    
    // });
  }

  const PageSelectorProps = {
    sendRequest: sendSoniRequest,
    convertNote: convertNote,
    currentreq: currentreq,
    page: currentPage,
    setPage: setCurrentPage,
    result: currentResult,
    setResult: setCurrentResult,
    reqs: prevreqs,
    audio: audioSrc
  };

  return (
    <div className="App">
      <MenuBar page={currentPage} status={soniStatus} setPage={setCurrentPage}/>
      <PageSelector {...PageSelectorProps}/>
      <button onClick={() => requestAudioFile()}>Try this</button>
    </div>
  );
}

export default App;
