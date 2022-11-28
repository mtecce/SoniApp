import React, {useState} from "react";
import InputTopRow from "./InputTopRow";
import {NoteSlider, DurationSlider,NHarmonics} from "./Sliders";

const SineWave = ({sendSoniReq,getNote,currentResult}) => {

    const [state,setState] = useState({
        fs:11025,
        makeplot:false,
        note:0,
        noteString:"A4",
        duration:1
    });

    const submitSineWave = e => {
        e.preventDefault();
        let sendData = {
            soni_type: "SineWave",
            fs: state.fs,
            makeplot: state.makeplot,
            soni_params: {
                note: state.note,
                duration: state.duration
            }
        };
        sendSoniReq(sendData);
    };

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

    return (currentResult === "Create New" ?
        <div className="SineWave">
            <form onSubmit={submitSineWave}>
                <div>
                    <InputTopRow handleInputs={formHandler}/>
                    <NoteSlider getNote={getNote} handleInputs={formHandler} states={state}/>
                    <DurationSlider handleInputs={formHandler} states={state}/>
                    <input type="submit" value="Create Sine Wave" className="submitinputbutton" />
                </div>
            </form>
        </div> :
        <div>Previous Result</div>
    )

};

const TriangleWave = ({sendSoniReq,getNote,currentResult}) => {

    const [state,setState] = useState({
        fs:11025,
        makeplot:false,
        note:0,
        noteString:"A4",
        duration:1
    });

    const submitTriangleWave = e => {
        e.preventDefault();
        let sendData = {
            soni_type: "TriangleWave",
            fs: state.fs,
            makeplot: state.makeplot,
            soni_params: {
                note: state.note,
                duration: state.duration
            }
        };
        sendSoniReq(sendData);
    };

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

    return (currentResult === "Create New" ?
        <div className="TriangleWave">
            <form onSubmit={submitTriangleWave}>
                <div>
                    <InputTopRow handleInputs={formHandler}/>
                    <NoteSlider getNote={getNote} handleInputs={formHandler} states={state}/>
                    <DurationSlider handleInputs={formHandler} states={state}/>
                    <input type="submit" value="Create Triangle Wave" className="submitinputbutton" />
                </div>
            </form>
        </div> : 
        <div>Previous Result</div>
    )

};

const SquareWave = ({sendSoniReq,getNote,currentResult}) => {

    const [state,setState] = useState({
        fs:11025,
        makeplot:false,
        note:0,
        noteString:"A4",
        duration:1
    });

    const submitSquareWave = e => {
        e.preventDefault();
        let sendData = {
            soni_type: "SquareWave",
            fs: state.fs,
            makeplot: state.makeplot,
            soni_params: {
                note: state.note,
                duration: state.duration
            }
        };
        sendSoniReq(sendData);
    };

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

    return (currentResult === "Create New" ?
        <div className="SquareWave">
            <form onSubmit={submitSquareWave}>
                <div>
                    <InputTopRow handleInputs={formHandler}/>
                    <NoteSlider getNote={getNote} handleInputs={formHandler} states={state}/>
                    <DurationSlider handleInputs={formHandler} states={state}/>
                    <input type="submit" value="Create Square Wave" className="submitinputbutton" />
                </div>
            </form>
        </div> : 
        <div>Previous Result</div>
    )

};

const SawtoothWave = ({sendSoniReq,getNote,currentResult}) => {

    const [state,setState] = useState({
        fs:11025,
        makeplot:false,
        note:0,
        noteString:"A4",
        duration:1,
        n_harmonics: 5
    });

    const submitSawtoothWave = e => {
        e.preventDefault();
        let sendData = {
            soni_type: "SawtoothWave",
            fs: state.fs,
            makeplot: state.makeplot,
            soni_params: {
                note: state.note,
                duration: state.duration,
                n_harmonics: state.n_harmonics
            }
        };
        sendSoniReq(sendData);
    };

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

    return (currentResult === "Create New" ?
        <div className="SawtoothWave">
            <form onSubmit={submitSawtoothWave}>
                <div>
                    <InputTopRow handleInputs={formHandler}/>
                    <NoteSlider getNote={getNote} handleInputs={formHandler} states={state}/>
                    <DurationSlider handleInputs={formHandler} states={state}/>
                    <NHarmonics handleInputs={formHandler} states={state} min={1} max={20} d_Val={10}/>
                    <input type="submit" value="Create Triangle Wave" className="submitinputbutton" />
                </div>
            </form>
        </div> : 
        <div>Previous Result</div>
    )

};


export {SineWave,TriangleWave,SquareWave,SawtoothWave};