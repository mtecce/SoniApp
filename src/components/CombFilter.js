import React, {useState} from "react";
import InputTopRow from './InputTopRow';
import NoteSlider from './NoteSlider';
import DurationSlider from "./DurationSlider";
import {CFNPulses,CFNSamples,CFFMagRange} from './CFContent';

const CombFilter = ({sendSoniReq,getNote,currentRequest}) => {

  const [state,setState] = useState({
    fs:0,
    makeplot: false,
    note: 0,
    noteString: "A4",
    duration: 1,
    n_pulses: 200,
    n_samples: 1000,
    fmag_range: 8000
  });

  const submitCombFilter = e => {
    e.preventDefault();

    let sendData = {
      soni_type: "comb_sound",
      fs: state.fs,
      makeplot: state.makeplot,
      soni_params: {
        note: state.note,
        duration: state.duration,
        n_pulses: state.n_pulses,
        n_samples: state.n_samples,
        fmag_range: state.fmag_range
      }
    };


    sendSoniReq(sendData);
  }

  const formHandler = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setState({...state,[e.target.name]:value});
    if(e.target.name === "note"){
      setState({
        ...state,
        noteString: getNote(value)
      });
    }
  };

  return (
    <div className="CombFilter">
      <form onSubmit={submitCombFilter}>
        <div>
          <InputTopRow handleInputs={formHandler}/>
          <NoteSlider getNote={getNote} handleInputs={formHandler} states={state}/>
          <DurationSlider handleInputs={formHandler} states={state}/>
          <CFNPulses handleInputs={formHandler} states={state}/>
          {state.makeplot &&
            <CFNSamples handleInputs={formHandler} states={state}/>
          }
          {state.makeplot &&
            <CFFMagRange handleInputs={formHandler} states={state}/>
          }
          <input type="submit" value="Create"/>
        </div>
      </form>
    </div>
  )

}

export default CombFilter;


