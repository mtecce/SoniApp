import React, {useEffect} from "react";

const StatusIcon = ({status}) => {

    useEffect(() => {

    },[status]);

    if(status === "active"){
        return (
            <div className="loadingdots">
                <span className="d1"></span>
                <span className="d2"></span>
                <span className="d3"></span>
            </div>
        )
    }else{
        return (
            <div className="inactiveLoadDiv" />
        )
    }
}

export default StatusIcon;