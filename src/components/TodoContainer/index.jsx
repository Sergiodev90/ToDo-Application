import React, { useContext, useEffect, useState } from "react";
import { CreateTodoButton } from "../CreateTodoButton";
import { TodoContext } from "../../contexts/TodoContext";
import { DroppableContainer } from "../DroppableContainer"; // Importa el componente DroppableContainer

import "./TodoContainer.css";
import { TodoMobileContext } from "../../contexts/MobileContext";
import { ModalMenu } from "../mobile/ModalMenu";

function TodoContainer(props) {
  const {openModal} = useContext(TodoContext)
  const { isMobile, isOpenToggleMobile,setIsOpenMobile } = useContext(TodoMobileContext);

  const {
    stateClickCompleted,
    stateClickPending,
    stateClickAll,
    stateClickArchived,
    setStateClickCompleted,
    setStateClickArchived,
    setStateClickAll,
    setStateClickPending,
    todos,
  } = useContext(TodoContext);

  const componentsRender = [
    {
      name: "ALL",
      function: () => {
        setTimeout(() => {
          setStateClickPending(false);
          setStateClickAll(true);
          setStateClickArchived(false);
          setStateClickCompleted(false);
          setIsOpenMobile(false)
        }, 100);
      },
      state: stateClickAll,
      validationLength: props.totalTodos.length > 0,
      renderLength: props.totalTodos.length,
    },
    {
      name: "PENDING",
      function: () => {
        setTimeout(() => {
          setStateClickPending(true);
          setStateClickAll(false);
          setStateClickArchived(false);
          setStateClickCompleted(false);
          setIsOpenMobile(false)
        }, 100);
      },
      state: stateClickPending,
      validationLength: props.pendingTodos.length > 0,
      renderLength: props.pendingTodos.length,
    },
    {
      name: "COMPLETED",
      function: () => {
        setTimeout(() => {
          setStateClickAll(false);
          setStateClickPending(false);
          setStateClickArchived(false);
          setStateClickCompleted(true);
          setIsOpenMobile(false)
        }, 100);
      },
      state: stateClickCompleted,
      validationLength: props.completedTodos.length > 0,
      renderLength: props.completedTodos.length,
    },
    {
      name: "ARCHIVED",
      function: () => {
        setTimeout(() => {
          setStateClickAll(false);
          setStateClickArchived(true);
          setStateClickCompleted(false);
          setStateClickPending(false);
          setIsOpenMobile(false)
        }, 100);
      },
      state: stateClickArchived,
      validationLength: props.archivedTodos.length > 0,
      renderLength: props.archivedTodos.length,
    },
  ];

  return (
    <>
      <div
        className={`${
          isMobile
            ? "TodoContainer-Eyelashes inactive"
            : "TodoContainer-Eyelashes"
        }`}
      >
        {componentsRender.map((item) => (
          <DroppableContainer
            key={item.name}
            id={item.name.toLowerCase()}
            item={item}
          ></DroppableContainer>
        ))}

        <CreateTodoButton />
      </div>

      <div
        className={
          todos.length < 1
            ? "TodoContainer--list TodoContainer--list-empty"
            : "TodoContainer--list"
        }
      >
        {props.children}
      </div>
      {isMobile && isOpenToggleMobile  && (
        <ModalMenu>
        <div className="TodoContainer-Eyelashes-Mobile">
          {componentsRender.map((item) => (
            <DroppableContainer
              key={item.name}
              id={item.name.toLowerCase()}
              item={item}
            ></DroppableContainer>
          ))}
          <CreateTodoButton />
        </div>
        </ModalMenu>
      )}
    </>
  );
}

export { TodoContainer };
