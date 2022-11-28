import React from "react"

const NoteSlider = ({handleInputs,states}) => {

    return (
        <div className="Note-Slider">
            <div className="NS-Texts">
              <p>Note</p>
              <p>{states.noteString}</p>
            </div>
            <input
              type="range"
              id="note"
              name="note"
              defaultValue = "0"
              onChange={handleInputs}
              step="1" min="-24" max="24"
            />
          </div>
    )
}

const DurationSlider = ({handleInputs,states}) => {

    return (
        <div className="Duration-Slider">
            <div className="DS-Texts">
                <p>Duration (Seconds)</p>
                <p>{states.duration}</p>
            </div>
            <input
                type="range" 
                id="duration"
                name="duration"
                defaultValue="0"
                onChange={handleInputs}
                step="1" min="1" max="10"
            />
        </div>
    )

}

const NPulses = ({handleInputs,states,min,max,d_val}) => { 

    return (
        <div className="NPulses">
            <div className="NP-Texts">
                <p>Number of Pulses</p>
                <p>{states.n_pulses}</p>
            </div>
            <input
                type="range"
                id="n_pulses"
                name="n_pulses"
                defaultValue={d_val}
                onChange={handleInputs}
                step="1"
                min={min}
                max={max}
            />
        </div>
    )
}

const NSamples = ({handleInputs,states,min,max,d_val}) => {
    
    return (
        <div className="NSamples">
            <div className="NS-Texts">
                <p>Samples per Graph</p>
                <p>{states.n_samples}</p>
            </div>
            <input
                type="range"
                id="n_samples"
                name="n_samples"
                defaultValue={d_val}
                onChange={handleInputs}
                step="100"
                min={min}
                max={max}
            />
        </div>
    )
}

const FMagRange = ({handleInputs,states,min,max,d_val}) => {

    return (
        <div className="FMagRange">
            <div className="FMR-Texts">
                <p>Fourier Magnitude Range</p>
                <p>{states.fmag_range}</p>
            </div>
            <input
                type="range"
                id="fmag_range"
                name="fmag_range"
                defaultValue={d_val}
                onChange={handleInputs}
                step="100"
                min={min}
                max={max}
            />
        </div>
    )
}

const NHarmonics = ({handleInputs,states,min,max,d_val}) => {

    return (
        <div className="NHarmonics">
            <div className="NH-Texts">
                <p># of Harmonics</p>
                <p>{states.n_harmonics}</p>
            </div>
            <input
                type="range"
                id="n_harmonics"
                name="n_harmonics"
                defaultValue={d_val}
                onChange={handleInputs}
                step="1"
                min={min}
                max={max}
            />
        </div>
    )

}

export {NoteSlider,DurationSlider,NPulses,NSamples,FMagRange,NHarmonics};