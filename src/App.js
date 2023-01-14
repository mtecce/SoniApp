import React, {useState, useEffect} from 'react';
import axios from 'axios';
import PageSelector from './components/PageSelector';
import MenuBar from './components/MenuBar';
import {PreviousRequests,ResultsContent} from './components/RequestsAndResults';
import Sudoku from './components/Sudoku';
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
    //requestPreviousResults();
  },[]);


  const getSoniRequest = (sendData) => {
    console.log(sendData);
    setSoniStatus("active");
    axios({
      method: "get",
      url:"/_soniReq",
      params: sendData
    })
    .then((response) => {
      if (!currentreq){                                       //there is no requests, memory must have been wiped
        setcurreq(response.data["directory"]);
        console.log(currentreq);
      }else if(response.data["directory"] === currentreq){    //the previous request was identical to the current request
        console.log("accidental repeat request");
      }else{                                                    //there existed an identical request saved in memory
        console.log("New Request Made, or Old Request Loaded");
      }
      setSoniStatus("innactive");
      requestPreviousResults();
    })
    .catch((err) => {
      console.log(err);
      setSoniStatus("innactive");
    });
  };

  const postSoniRequest = (sendData,sendFiles) => {
    setSoniStatus("active");
    axios.post('/_soniReq',sendFiles, {
      params: sendData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      if (!currentreq){                                       //there is no requests, memory must have been wiped
        setcurreq(response.data["directory"]);
        console.log(currentreq);
      }else if(response.data["directory"] === currentreq){    //the previous request was identical to the current request
        console.log("accidental repeat request");
      }else{                                                  //there existed an identical request saved in memory
        console.log("New Request Made, or Old Request Loaded");
      }
      setSoniStatus("innactive");
      requestPreviousResults();
    })
    .catch((err) => {
      console.log(err);
      setSoniStatus("innactive");
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


  const deleteResult = (res_string) => {
    axios({
      method:"get",
      url:"/_delete_oldest",
      data: {"res_string":res_string}
    })
    .then((response) => {
      console.log(response["respo"]);
    })
  };
  

  async function requestAudioFile() {

    axios({
      method: "get",
      url:"/_audio",
      responseType:"blob"
    })
    .then((response) => {
      console.log(typeof(response));
      let newurl = URL.createObjectURL(response.data);

      let audTag = document.createElement('audio');
      audTag.id = "audio"; audTag.controls = "controls";
      audTag.src = newurl; audTag.type = "audio/wav";
      document.getElementById("aud_div").appendChild(audTag);
    
    });
  }



  const PageSelectorProps = {
    sendGetRequest: getSoniRequest,
    sendPostRequest: postSoniRequest,
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
      {/* <MenuBar page={currentPage} status={soniStatus} setPage={setCurrentPage}/> */}
      {/* <PageSelector {...PageSelectorProps}/> */}
      <Sudoku/>
    </div>
  );
}

export default App;
