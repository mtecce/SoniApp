// fs, song one, song two, makeplot
import React, {useState} from 'react';
import InputTopRow from './InputTopRow';

const ConvolveAudio = ({sendSoniReq,currentResult}) => {

    const [state,setState] = useState({
        song_one: "",
        song_two: "",
        makeplot: false
    });

    const submitConvolve = e => {
        e.preventDefault();
        let sendData = {
            soni_type: "Convolution",
            fs: 44100,
            makeplot: state.makeplot === true,
            soni_params: {
                song_one: state.song_one,
                song_two: state.song_two
            }
        };
        sendSoniReq(sendData);
    };

    const formHandler = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setState({...state,[e.target.name]:value});
    };

    return (currentResult === "Create New" ?
        <div className="Convolution">
            <form onSubmit={submitConvolve}>
                <div>
                    <InputTopRow handleInputs={formHandler} useFS={false} useMP={true}/>
                    <input type="file" name="song_one" 
                </div>
            </form>
        </div> :
        <div>Previous Result</div>
    )

};

export default ConvolveAudio;