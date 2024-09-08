import { useState } from 'react';
import './TodoCategory.css';

import { SketchPicker } from 'react-color';
import { useEdit } from '../../hooks/useEdit';

function TodoCategory(props) {
    const [color, setColor] = useState('');
    const { click, text, handleClick, handleEditText, handleEvent } = useEdit(
        {
            newText:props.category,
            id:props.id,
            to:"Categories",
            color:color,
            state:props.isOnArchives
        }
    );
    const handleColorChange = (color) => {
        setColor(color.hex);
      };
    return (
        <>
            {!click && (
                <div className="TodoCategory" style={{ backgroundColor: props.color_Category }} >
                <p 
                    
                    onClick={handleClick} 
                >
                    {props.category}
                </p>
                </div>
            )}
            {click && (
                <>
                <div className="TodoCategory-input" style={{ backgroundColor: color}}>
                <input 
                     
                    value={text} 
                    onChange={handleEditText} 
                    onKeyDown={handleEvent} 
                />
                </div >
                
                <div className='Container-SketchPicker' > 

                    <SketchPicker color={color} onChange={handleColorChange} />
                
                </div>
                </>
            )}
        </>
    );
}

export { TodoCategory };