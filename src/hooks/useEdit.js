import { useState,useContext } from "react"
import { TodoContext } from "../contexts/TodoContext"
import { DraggableDroppContext } from "../contexts/DraggableDroppContext"

export function useEdit({newText,id,to,color,state}){
    const [text, setText] = useState(newText)
    const [click, setClick] = useState(false)
    const {editTodoText} = useContext(TodoContext)

    function handleClick(){
      if(state === false){
        setClick(true)
      }
        
      }
      function handleEvent(event){
        if(event.key === 'Enter' && text.length > 0){
            setClick(false)
            editTodoText(text,id,to,color,state)
            return true
        }
      }
      function handleEditText(event){
        if(handleEvent){
          setText(event.target.value)
        }
      }

      return {
        click,text,handleClick,handleEditText,handleEvent,state
      }
}