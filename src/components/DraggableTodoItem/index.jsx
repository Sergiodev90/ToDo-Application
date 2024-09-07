import React, { useContext, useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { DraggableDroppContext } from '../../contexts/DraggableDroppContext';

import DraggIcon from '../../assets/images/drag (1).png';
import './TodoItem.css';

function DraggableTodoItem({ id, children }) {
  const { isDragging, setIsDragging} = useContext(DraggableDroppContext);
  const [dragEnabled, setDragEnabled] = useState(false);

  const handleDragStart = () => {


    if (dragEnabled) {
      console.log('Drag start',id);
      setIsDragging(true);
    }
  };


  const handleMouseOver = () => {
    setDragEnabled(true);
  };

  const handleMouseLeave = () => {
    setDragEnabled(false);
  };

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const style = transform
    ? {
        zIndex: 1,
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        position: 'absolute',
      }
    : undefined;

  return (
    <li
      className="TodoItem"
      ref={dragEnabled ? setNodeRef : null}
      style={isDragging ? style : {}}
      {...(dragEnabled ? { ...listeners, ...attributes } : {})}
    >
      <div
        className="Container-Dragg-Icon"
        style={transform ? { cursor: 'grabbing' } : { cursor: 'grab' }}
      >
        <img
          src={DraggIcon}
          className="icon-drag"
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
          onDragStart={handleDragStart}
          alt="icon-drag"
        />
      </div>
      {children}
    </li>
  );
}

export { DraggableTodoItem };

