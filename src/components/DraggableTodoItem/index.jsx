import React, { useContext, useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { DraggableDroppContext } from '../../contexts/DraggableDroppContext';
import { CheckboxCircular } from '../CheckBoxCircular';
import { TodoContext } from '../../contexts/TodoContext';

import DraggIcon from '../../assets/images/drag (1).png';
import './TodoItem.css';

function DraggableTodoItem(props) {
  const { isDragging, setIsDragging} = useContext(DraggableDroppContext);
  const [dragEnabled, setDragEnabled] = useState(false);
  const { completed, setCompleted } = useContext(TodoContext);


  const handleDragStart = () => {


    if (dragEnabled) {
      console.log('Drag start',props.id);
      setIsDragging(true);
    }
  };


  const handleMouseOver = () => {
    setDragEnabled(true);
  };

  const handleMouseLeave = () => {
    setDragEnabled(false);
  };
  const handleCheckboxChange = () => {
    setCompleted(!completed);
    props.onComplete();
  };
  const handleTouchStart = (e) => {
    e.preventDefault();
    if (dragEnabled) {
      handleDragStart();
      // Additional logic for touch-based dragging can be added here if needed
    }
  };

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });

  const style = transform
    ? {
        zIndex: 1,
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        position: 'absolute',
        width:"auto"
      }
    : undefined;

  return (
    <li
      className="Container-Main-Todo"
      ref={dragEnabled ? setNodeRef : null}
      style={isDragging ? style : {}}
      {...(dragEnabled ? { ...listeners, ...attributes } : {})}
    >

      <div

        className="Container-Funtionality-Todo"
      >
        <img
          src={DraggIcon}
          className="icon-drag"
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
          onDragStart={handleDragStart}
          onTouchStart={handleTouchStart} 
          alt="icon-drag"
          style={transform ? { cursor: 'grabbing' } : { cursor: 'grab' }}

        />
        <CheckboxCircular
        checked={props.completed}
        onChange={handleCheckboxChange}
        inArchived={props.isOnArchives}
      />
      </div>
      
      {props.children}
    </li>
  );
}

export { DraggableTodoItem };

