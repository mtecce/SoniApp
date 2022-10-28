import React from "react";

const CombFilter = ({sendSoniReq}) => {

  let data1 = {
    soni_type: "comb_sound",
    fs: 44100,
    makeplot: true,
    soni_params: {
      note: 1,
      duration: 1,
      n_pulses: 200,
      n_samples: 1000,
      fmag_range: 8000
    }
  };

  return (
    <div className="CombFilter">
      <button className="CFButton" onClick={() => sendSoniReq(data1)}>New Soni</button>
    </div>
  )

}

export default CombFilter;