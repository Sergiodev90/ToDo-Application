import { createContext  , useState } from "react";


const DraggableDroppContext = createContext();


function DraggableDroppProvider(props){

    const [isDragging,setIsDragging] = useState(false);
    const [id,setId] = useState('');
    const [parent,setParent] = useState(null)

    return(
        <DraggableDroppContext.Provider value={{
            isDragging,
            setIsDragging,
            id,
            setId,
            setParent,
            parent
        }}>
            {props.children}
        </DraggableDroppContext.Provider>
    )
}

export {DraggableDroppContext, DraggableDroppProvider}