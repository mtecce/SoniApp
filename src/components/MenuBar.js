import React from "react";
import StatusIcon from './StatusIcon';

const MenuBar = ({page,status,setPage}) => {
    
    return (
        <header className="menubar_wrapper">
            {page !== "Home" &&
                <div className="back_arrow_wrapper">
                    <img 
                        alt="Back Arrow"
                        src="./icons/arrow.png"
                        className="back_arrow"
                        onClick={() => setPage("Home")} />
                </div>
            }
            <div className="current_page_wrapper">
                <div className="current_page">{page}</div>
            </div>
            <StatusIcon status={status}/>
        </header>
    )
}

export default MenuBar;

