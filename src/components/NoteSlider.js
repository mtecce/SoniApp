import React from "react";

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

export default NoteSlider;