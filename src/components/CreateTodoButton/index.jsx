import React, { useContext } from "react";
import { TodoContext } from "../../contexts/TodoContext";
import './CreateTodoButton.css';
import { TodoMobileContext } from "../../contexts/MobileContext";

function CreateTodoButton() {
  const {isOpenToggleMobile,setIsOpenMobile} = useContext(TodoMobileContext)
  const {openModal,setOpenModal,loading,todos} = React.useContext(TodoContext);


  const shouldApplyStartClass = todos.length<= 0 && !loading;


  return (
    <button className={`CreateTodoButton ${ shouldApplyStartClass? 'CreateTodoButton--start' : ''}`}
      

      onClick={() => {
        setIsOpenMobile(false)
        setOpenModal(true) 
      }}
    >
      +
    </button>
  );
}

export { CreateTodoButton };