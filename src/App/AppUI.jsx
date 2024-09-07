import React, { useContext} from "react";
import { TodoSearch } from "../components/TodoSearch";
import { TodoList } from "../components/TodoList";
import { TodoItem } from "../components/TodoItem";
import { TodosLoading } from "../components/TodosLoading";
import { TodosError } from "../components/TodosError";
import {
  EmptyTodos,
  EmptyTodosAll,
  EmptyTodosPending,
  EmptyTodosCompleted,
  EmptyTodosArchived,
} from "../components/EmptyTodos";
import { TodoContext } from "../contexts/TodoContext";

import { TodoForm } from "../components/TodoForm";
import { TodoNotFound } from "../components/TodoNotFound";
import { TodoContainer } from "../components/TodoContainer";
import { Root } from "./Root";
import { Modal } from "../components/Modal";
import { TodoHeader } from "../components/TodoHeader";
import { DraggableTodoItem } from "../components/DraggableTodoItem";


function AppUI() {
  const {
    loading,
    error,
    searchedTodos,
    completeTodo,
    deleteTodo,
    openModal,
    todos,
    searchValue,
    setSearchValue,
    completedTodos,
    totalTodos,
    stateClickCompleted,
    stateClickAll,
    stateClickArchived,
    stateClickPending,
    setOpenModal,
    Categories,
    searchedTodosByCategory,
    searchCategory,
    archiveTodo,
    pendingTodos,
    archivedTodos,
    unArchivedTodo,
  } = useContext(TodoContext);







  // const handleDragEnd = (event) =>{
  //   const {over,active} = event
  //   setParent(over ? over.id : null);
  //   setId(active.id)
  //   setIsDragging(false)
  // }

  // useEffect(()=>{
  //     editStateTodoByDragg(parent,id)
  // },[parent,id,editStateTodoByDragg])

  
  return (
    <>
      <Root>
        <TodoHeader>
          {/* <TodoCounter completed={completedTodos} total={totalTodos} /> */}
          <TodoSearch
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            categories={Categories}
            todos={todos}
          />
        </TodoHeader>
            
          <TodoContainer
            className="TodoList-Container"
            pendingTodos={pendingTodos}
            archivedTodos={archivedTodos}
            completedTodos={completedTodos}
            totalTodos={totalTodos}

          >
            <TodoList
              Loading={loading}
              stateClickAll={stateClickAll}
              stateClickCompleted={stateClickCompleted}
              stateClickArchived={stateClickArchived}
              stateClickPending={stateClickPending}
              error={error}
              searchedTodos={searchedTodos}
              searchedTodosByCategory={searchedTodosByCategory}
              searchCategory={searchCategory}
              todos={todos}
              totalTodos={totalTodos}
              pendingTodos={pendingTodos}
              completedTodos={completedTodos}
              archivedTodos={archivedTodos}
              onError={() => <TodosError />}
              onLoading={() => <TodosLoading />}
              onEmpty={() => <EmptyTodos />}
              onNotFound={() => <TodoNotFound />}
              onAllEmpty={() => <EmptyTodosAll />}
              onPendingEmpty={() => <EmptyTodosPending />}
              onCompletedEmpty={() => <EmptyTodosCompleted />}
              onArchivedEmpty={() => <EmptyTodosArchived />}
              renderAll={(todo) => (
                <DraggableTodoItem id={todo.id} key={todo.id} >

                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  text={todo.text}
                  startDate={todo.startDate}
                  endDate={todo.endDate}
                  categories={todo.categories}
                  completed={todo.completed}
                  isOnArchives={todo.inArchived}
                  isOnPeding={todo.pending}
                  inAll={todo.inAll}
                  onComplete={() => completeTodo(todo.id)}
                  onArchived={() => archiveTodo(todo.id)}
                  onDelete={() => deleteTodo(todo.id)}
                  onUnarchived={() => unArchivedTodo(todo.id)}
                />
                </DraggableTodoItem>
              )}
            >
              {/* {loading && (
              <>
                <TodosLoading />
                <TodosLoading />
                <TodosLoading />
              </>
            )} */}
            </TodoList>
          </TodoContainer>

        {openModal && (
          <Modal setOpenModal={setOpenModal} openModal={openModal}>
            <TodoForm />
          </Modal>
        )}
      </Root>
    </>
  );
}
export { AppUI };
