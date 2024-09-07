import React from "react";
import {ReactComponent as EmptyList} from '../../assets/svg/CreateTodos.svg'
import {ReactComponent as EmptyListAll} from '../../assets/svg/takeBreak.svg'
import {ReactComponent as EmpytListPending} from '../../assets/svg/EmptyPending.svg'
import {ReactComponent as EmptyListCompleted} from '../../assets/svg/CompletedEmpty.svg'
import  EmptyListArchived from '../../assets/images/ArchivedList.png'
import "./styles/EmptyTodos.css";


function EmptyTodos(){

   return (
      <div className = "EmptyTodos">
         <p> CREATE NEW TODOS!</p>
         <EmptyList className="EmptyList"/>
      </div>
   );
}

function EmptyTodosAll(){
   return(
      <div className="EmptyTodos">
         <p>All clear! Time to take a break</p>
         <EmptyListAll className="EmptyList"/>
      </div>
   );
}


function EmptyTodosPending(){
   return(
      <div className="EmptyTodos">
         <p>You're on top of your game!</p>
         <EmpytListPending className="EmptyList"/>
      </div>
   );
}
function EmptyTodosCompleted(){
   return(
      <div className="EmptyTodos">  
         <p>No completed tasks yet. </p>
         <EmptyListCompleted className="EmptyList"/>
      </div>
   );
}

function EmptyTodosArchived(){
   return(
      <div className="EmptyTodos">
         <p>No Archived tasks yet</p>
         <img src={EmptyListArchived} alt="archivedEmpty" className="EmptyList"></img>
      </div>
   );
}


export {EmptyTodos,EmptyTodosAll,EmptyTodosPending,EmptyTodosCompleted,EmptyTodosArchived} 