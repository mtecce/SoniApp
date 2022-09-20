import React from "react";

import {useQuery} from 'react-query';
import axios from 'axios';


let data1 = {
    soniType: "comb_sound",
    fs: 44100,
    note: 1,
    length: 1,
    n_pulses: 200,
    n_samples: 1000,
    c_range: 8000
  };

  let data2 = {
    soniType: "comb_sound",
    fs: 44100,
    note: 5,
    length: 1,
    n_pulses: 200,
    n_samples: 1000,
    range: 4000
  };



  const sendReq = (sendData) => {
    axios({
      method: "get",
      url:"/_soniReq",
      params: sendData
    })
    .then((response) => {
      setCurrentReq(response.data['directory'])
      
    });
  }

const CombFilter = () => {

}

export default CombFilter;