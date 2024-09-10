import React, { useState } from "react";
import { AppUI } from "./AppUI";
import { TodoProvider } from "../contexts/TodoContext";

import { DraggableDroppProvider } from "../contexts/DraggableDroppContext";
import { DndContext } from "@dnd-kit/core";
import { TodoMobileProvider } from "../contexts/MobileContext";

function App() {
  const [parent, setParent] = useState(null);
  const [id, setId] = useState("");
  const handleDragEnd = (event) => {
    const { over, active } = event;
    setParent(over ? over.id : null);
    setId(active.id);
  };

  return (
    <TodoMobileProvider>
    <DraggableDroppProvider>
      <DndContext onDragEnd={handleDragEnd}>
        <TodoProvider
          id={id}
          setid={setId}
          parent={parent}
          setParent={setParent}
        >
          <AppUI />
        </TodoProvider>
      </DndContext>
    </DraggableDroppProvider>
    </TodoMobileProvider>
  );
}

export default App;
