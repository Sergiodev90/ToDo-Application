import { useContext, useState } from 'react';
import './TodoCategory.css';

import { ChromePicker,GooglePicker } from 'react-color';
import { useEdit } from '../../hooks/useEdit';
import { TodoMobileContext } from '../../contexts/MobileContext';

function TodoCategory(props) {
    const [color, setColor] = useState('');
    const {isMobile} = useContext(TodoMobileContext)
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
                
                <div className='Container-Picker' > 

                    {!isMobile && <GooglePicker color={color} onChange={handleColorChange} className="GooglePicker"/>}
                    {isMobile && <ChromePicker color={color} onChange={handleColorChange} className="ChromePicker"/>}
                </div>
                </>
            )}
        </>
    );
}

export { TodoCategory };