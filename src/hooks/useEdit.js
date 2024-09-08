import { useState,useContext } from "react"
import { TodoContext } from "../contexts/TodoContext"

export function useEdit({newText,id,to,color,state}){
    const [text, setText] = useState(newText)
    const [click, setClick] = useState(false)
    const {editTodoText} = useContext(TodoContext)

    function handleClick(id){
      if(state === false){
        setClick(true)
      }
      console.log(id)
        
      }
      function handleEvent(event){
        if(event.key === 'Enter' && text.length > 0){
            setClick(false)
            console.log(id)
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