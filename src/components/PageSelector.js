import React from "react";
import CombFilter from "./CombFilter";
import {SineWave,TriangleWave,SquareWave,SawtoothWave} from "./Waves";
import ConvolveAudio from "./ConvolveAudio";
import Downsample from "./Downsample";
import { PreviousRequests, ResultsContent } from "./RequestsAndResults";


const PageOptions = ({setPage, setResult}) => {

    const onPageChange = (pagetype) => {
        setPage(pagetype);
        setResult("Create New");
    };
    
    return (
        <div className="PageOptions">
            <p onClick={() => onPageChange("CombFilter")}>CombFilter</p>
            <p onClick={() => onPageChange("SineWave")}>Sine Wave</p>
            <p onClick={() => onPageChange("TriangleWave")} >Triangle Wave</p>
            <p onClick={() => onPageChange("SquareWave")} >Square Wave</p>
            <p onClick={() => onPageChange("SawtoothWave")} >Sawtooth Wave</p>
            <p onClick={() => onPageChange("Convolution")} >Convolution</p>
            <p onClick={() => onPageChange("DownSampling")} >Down Sampling</p>
        </div>
    )
};

const PageSelector = ({sendGetRequest,sendPostRequest,convertNote,currentreq,page,setPage,result,setResult,reqs,audio}) => {

    const getProps = {sendSoniReq:sendGetRequest, getNote:convertNote, currentResult:result};
    const postProps = {sendSoniReq:sendPostRequest, getNote:convertNote, currentResult:result};


    const pageswitch = () => {
        switch(page){
            case "CombFilter":
                return <CombFilter {...getProps}/>
            case "SineWave":
                return <SineWave {...getProps}/>
            case "TriangleWave":
                return <TriangleWave {...getProps}/>
            case "SquareWave":
                return <SquareWave {...getProps}/>
            case "SawtoothWave":
                return <SawtoothWave {...getProps}/>
            case "Convolution":
                return <ConvolveAudio sendSoniReq={sendPostRequest} currentResult={result}/>
            case "DownSampling":
                return <Downsample/>
            default: console.log("oops");
        };
    };

    return (page === "Home" ?
        <PageOptions setPage={setPage} setResult={setResult}/> :
        <div className="Page-Wrap">
            <PreviousRequests reqs={reqs} page={page} result={result} setResult={setResult} />
            {pageswitch()}
            <ResultsContent result={result} page={page} audioSrc={audio}/>
        </div>
    )
};

export default PageSelector;