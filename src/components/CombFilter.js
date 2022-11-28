import React, {useState} from "react";
import InputTopRow from './InputTopRow';
import {NoteSlider,DurationSlider,NPulses,NSamples,FMagRange} from './Sliders';

const CombFilter = ({sendSoniReq,getNote,currentResult}) => {

  const [state,setState] = useState({
    fs:11025,
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
      soni_type: "CombFilter",
      fs: parseInt(state.fs),
      makeplot: (state.makeplot === "true"),
      soni_params: {
        note: parseInt(state.note),
        duration: parseInt(state.duration),
        n_pulses: parseInt(state.n_pulses),
        n_samples: parseInt(state.n_samples),
        fmag_range: parseInt(state.fmag_range)
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
        note: value,
        noteString: getNote(value)
      });
    }
  };



  return (currentResult === "Create New" ?
    <div className="CombFilter">
      <form onSubmit={submitCombFilter}>
        <div>
          <InputTopRow handleInputs={formHandler}/>
          <NoteSlider getNote={getNote} handleInputs={formHandler} states={state}/>
          <DurationSlider handleInputs={formHandler} states={state}/>
          <NPulses
            handleInputs={formHandler}
            states={state}
            min={1}
            max={400}
            d_val={200}  
          />
          {state.makeplot &&
            <NSamples
              handleInputs={formHandler}
              states={state}
              min={0}
              max={2000}
              d_val={1000}  
            />
          }
          {state.makeplot &&
            <FMagRange
              handleInputs={formHandler}
              states={state}
              min={4000}
              max={12000}
              d_val={8000}
            />
          }
          <input type="submit" value="Create Combfilter Sample" className="submitinputbutton"/>
        </div>
      </form>
    </div> : 
    <div>Previous Result</div>
  )

}

export default CombFilter;


