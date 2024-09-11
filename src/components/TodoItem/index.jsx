import React, { useState } from "react";
import { TodoCategory } from "../TodoCategory";
import { TODO_LIST_CATEGORIES } from "../TodoList_Categories";
import { ReactComponent as ArchiveBoxIcon } from "../../assets/svg/archive.svg";
import { ReactComponent as ArrowIcon } from "../../assets/svg/arrow.svg";
import { useEdit } from "../../hooks/useEdit";
import "./AlertToChangeState.css";

function AlertToChangeState(props) {
  return (
    <>
      <div className="contaienr--return--delente__item">
        <span className="return" onClick={props.onUnarchived}>
          RETURN
        </span>
        <span className="line"></span>
        <span className="delete" onClick={props.onDelete}>
          DELETE
        </span>
      </div>
    </>
  );
}

function TodoItem(props) {
  const { click, text, handleClick, handleEditText, handleEvent } = useEdit({
    newText: props.text,
    id: props.id,
    to: "Todos",
    state: props.isOnArchives,
  });

  const [expandedTodos, setExpandedTodos] = useState([]);

  const [open, setOpen] = useState(false);

  const handleToggleExpand = (id) => {
    setExpandedTodos((prev) =>
      prev.includes(id) ? prev.filter((todoId) => todoId !== id) : [...prev, id]
    );
  };


  const handleClikReturnDeleteItem = () => {
    setOpen(!open);
  };

  return (
    <>
        <div className="Container-Todo">
          <div className="First-Section-Container">
          {!click && (
              <p
                className={`TodoItem-p ${
                  props.completed && "TodoItem-p--complete"
                }`}
                onClick={() => handleClick()}
              >
                {props.text}
              </p>
            )}
            {click && (
              <input
                value={text}
                onKeyDown={handleEvent}
                onChange={handleEditText}
              
              />
            )}
            <div className="container-Categories">
            <TODO_LIST_CATEGORIES>
              {props.categories.map((item) => (
                <TodoCategory
                  key={item.id}
                  id={item.id}
                  isExpanded={expandedTodos.includes(props?.id)}
                  handleClickTag={() => handleToggleExpand(props?.id)}
                  category={item.category}
                  color_Category={item.color}
                  isOnArchives={props.isOnArchives}
                />
              ))}
            </TODO_LIST_CATEGORIES>
          </div>
          </div>
          <div className="Second-Section-Container">

            <p>{props.startDate}</p>
            <p>{props.endDate}</p>
            <div className="Funtionality-Delete-unarchive">
            {!props.isOnArchives && (
              <ArchiveBoxIcon
                className="ArchiveIcon"
                onClick={props.onArchived}
              />
            )}
            {props.isOnArchives && (
              <ArchiveBoxIcon
                className="ArchiveIcon"
                onClick={() => handleClikReturnDeleteItem()}
              />
            )}
            {open && (
              <AlertToChangeState
                onDelete={props.onDelete}
                onUnarchived={props.onUnarchived}
              />
            )}
            </div>
          </div>
        </div>
        </>
  );
}

export { TodoItem };
