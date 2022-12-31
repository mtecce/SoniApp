// fs, song one, song two, makeplot
import React, {useState} from 'react';
import InputTopRow from './InputTopRow';

const ConvolveAudio = ({sendSoniReq,currentResult}) => {

    const [state,setState] = useState({
        sound_one: [],
        sound_two: [],
        makeplot: false
    });

    const submitConvolve = e => {
        e.preventDefault();

        let sendFiles = new FormData();
        sendFiles.append('sound_one', state.sound_one);
        sendFiles.append('sound_two', state.sound_two);

        let sendData = {
            soni_type: "Convolution",
            fs: 44100,
            makeplot: state.makeplot === true,
            soni_params: {}
        };
        sendSoniReq(sendData,sendFiles);
    };

    const formHandler = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.files[0];
        setState({...state,[e.target.name]:value});
    };

    return (currentResult === "Create New" ?
        <div className="Convolution">
            <form onSubmit={submitConvolve}>
                <div>
                    <InputTopRow handleInputs={formHandler} useFS={false} useMP={true}/>
                    <div className='SoundInputDiv'>
                        <p>First Sound Choice</p>
                        <input type="file" name="sound_one" onChange={formHandler}/>
                    </div>
                    <div className='SoundInputDiv'>
                        <p>Second Sound Choice</p>
                        <input type="file" name="sound_two" onChange={formHandler}/>
                    </div>
                    <input type="submit" value="Create Sound Convolution" className="submitinputbutton"/>
                </div>
            </form>
        </div> :
        <div>Previous Result</div>
    )

};

export default ConvolveAudio;