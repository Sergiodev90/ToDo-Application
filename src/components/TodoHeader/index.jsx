import React from "react";
import './TodoHeader.css'
function TodoHeader({children}){
    return(
        <header className="Header-Todo_counter_search">
            {children}
        </header>
    )
}

export {TodoHeader}