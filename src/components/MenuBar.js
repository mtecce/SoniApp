import React from "react";
import StatusIcon from './StatusIcon';

const MenuBar = ({currentPage,currentStatus}) => {
    
    return (
        <header className="menubar_wrapper">
            <div className="back_arrow_wrapper">
                <img alt="Back Arrow" src="./icons/arrow.png" className="back_arrow" />
            </div>
            <div className="current_page_wrapper">
                <div className="current_page">{currentPage}</div>
            </div>
            <StatusIcon status={currentStatus}/>
        </header>
    )
}

export default MenuBar;

