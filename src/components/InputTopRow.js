import React from "react";

const InputTopRow = ({handleInputs}) => {
    return (
        <div className="toprow">
          <div className="fs-row">
            <p>Sample Rate</p>
            <div id="tr-in-d">
              <select
                id="fs"
                name="fs"
                onChange={handleInputs}
                className="fs-input"
              >
                <option value="11025">11025</option>
                <option value="22050">22050</option>
                <option value="44100">44100</option>
                <option value="88200">88200</option>
              </select>
            </div>
          </div>
          <div className="mp-row">
            <p>Make Plot?</p>
            <div id="tr-in-d">
              <input 
                id="mp"
                name="makeplot"
                type="checkbox"
                onChange={handleInputs}
                className="mp-input"
              />
            </div>
          </div>
        </div>
    )
}

export default InputTopRow;