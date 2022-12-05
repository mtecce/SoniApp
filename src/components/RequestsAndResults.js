import React,{useEffect} from "react";

const PreviousRequests = ({reqs,page,currentResult,setResult}) => {

    

    let newReqs = [];
    let reqInd = 0;
    for (let [key,value] of Object.entries(reqs)){
        if(value["request"].soni_type === page){
            newReqs.push(reqs[reqInd]);
        }
        reqInd++;
    }

    return (
        <div className="PreviousRequests">
            <select id="PrevReqs" onChange={(e) => {setResult(e.target.value);}} className="PrevReqSelect">
                <option key="Create" value="Create New">Create New</option>
                {
                    newReqs.map((req,i) => {
                        return (
                            <option key={i} value={req["res_string"]}>{req["description"]}</option>
                        )
                    })
                }
            </select>
        </div>
    )
};

const ResultsContent = ({result, page, audioSrc}) => {

    useEffect(() => {
        
    }, [audioSrc]);

    return (
        <div id="aud_div"/>
    )

};

export {PreviousRequests,ResultsContent};