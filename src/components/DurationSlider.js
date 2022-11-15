import React from "react";

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

export default DurationSlider;