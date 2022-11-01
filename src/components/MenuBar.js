import React, {useState,useEffect} from "react";
import StatusIcon from './StatusIcon';

const MenuBar = ({currentPage,currentStatus}) => {
    
    return (
        <header className="menubar_wrapper">
            <div className="back_arrow_wrapper">
                <img alt="Back Arrow" src="./icons/arrow.png" ></img>
            </div>
            <div className="current_page_wrapper">
                <p className="current_page">{currentPage}</p>
            </div>
            <StatusIcon status={currentStatus}/>
        </header>
    )
}

export default MenuBar;

