import React from 'react';
import { useDroppable } from '@dnd-kit/core';

function DroppableContainer({ id,item }) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      // style={{ backgroundColor: isOver ? 'lightgreen' : undefined }}
    >
            <button
              className={`Eyelashes-TodoContainer-list wrapper ${
                item.state ? "active" : ""
              }`}
              onClick={() => item.function()}
              style={{backgroundColor: isOver ? 'cyan' : undefined }}
            >
              <span>{item.name}</span>
              <div className="container-total-todos__insection">
                <p>{item.validationLength > 0 && item.renderLength}</p>
              </div>
            </button>
    </div>
  );
}

export {DroppableContainer}
