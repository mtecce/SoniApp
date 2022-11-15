import React from "react";

const CFNPulses = ({handleInputs,states}) => {

    return (
        <div className="CFNPulses">
            <div className="CFNP-Texts">
                <p>Number of Pulses</p>
                <p>{states.n_pulses}</p>
            </div>
            <input
                type="range"
                id="n_pulses"
                name="n_pulses"
                defaultValue="200"
                onChange={handleInputs}
                step="1"
                min="1"
                max="400"
            />
        </div>
    )
}

const CFNSamples = ({handleInputs,states}) => {
    
    return (
        <div className="CFNSamples">
            <div className="CFNS-Texts">
                <p>Number of Samples/Graph</p>
                <p>{states.n_samples}</p>
            </div>
            <input
                type="range"
                id="n_samples"
                name="n_samples"
                defaultValue="1000"
                onChange={handleInputs}
                step="100"
                min="0"
                max="2000"
            />
        </div>
    )
}

const CFFMagRange = ({handleInputs,states}) => {

    return (
        <div className="CFFMagRange">
            <div className="CFFMR-Texts">
                <p>Fourier Magnitude Range</p>
                <p>{states.fmag_range}</p>
            </div>
            <input
                type="range"
                id="fmag"
                name="fmag"
                defaultValue="8000"
                onChange={handleInputs}
                step="100"
                min="4000"
                max="12000"
            />
        </div>
    )
}

export {CFNPulses,CFNSamples,CFFMagRange};