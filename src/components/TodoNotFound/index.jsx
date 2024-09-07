import React from 'react';
import {ReactComponent as NotFound} from '../../assets/svg/notFound.svg'
import './TodoNotFound.css'

function TodoNotFound(){
    return(
        <div className='Container-Item-TodoNotFound'>
            <p>No items found</p>
            <NotFound className='TodoNotFound'/>
        </div>
        
    );
}

export {TodoNotFound}