import React, {useState,useEffect} from "react";
import StatusIcon from './StatusIcon';

const MenuBar = ({currentPage,currentStatus}) => {
    
    return (
        <header>
            <h1>Sonification App</h1>
            <div>
                <div>
                    <img src="" alt="" />
                </div>
                <div>
                    <h1>{currentPage}</h1>
                </div>
                <StatusIcon status={currentStatus}/>
            </div>
        </header>
    )
}

export default MenuBar;