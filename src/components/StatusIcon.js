import React, {useEffect} from "react";

const StatusIcon = ({status}) => {

    useEffect(() => {

    },[status]);

    if(status === "active"){
        return (
            <div className="loadingdots">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>
        )
    }else{
        return (
            <div className="inactiveLoadDiv" />
        )
    }
}

export default StatusIcon;