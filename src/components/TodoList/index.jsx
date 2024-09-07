import './TodoList.css';

function TodoList(props) {


  const renderTodos = (todos) => todos.map(props.renderAll);

  const filteredTodos = () => {
    let todos = props.searchedTodos;

    if (props.searchCategory !== 'All') {
      todos = props.searchedTodosByCategory;
    }
    if(props.stateClickAll){
        todos = todos.filter(todo => todo.pending === true || todo.completed === true)
    }else if(props.stateClickPending) {
      todos = todos.filter(todo => todo.pending === true && todo.completed === false);
    } else if (props.stateClickCompleted) {
      todos = todos.filter(todo => todo.completed === true && todo.pending === false);
    } else if (props.stateClickArchived) {
      todos = todos.filter(todo => todo.inArchived === true);
    }

    return todos;
  };

  return (
    <div className="TodoList" >
      {props.Loading && props.onLoading()}
      {props.error && props.onError()}
      {!props.Loading && props.todos.length <= 0 && props.onEmpty()}

      {!props.Loading && props.searchedTodos.length === 0 && 
  (props.totalTodos.length !== 0 &&
   props.completedTodos.length !== 0 &&
   props.pendingTodos.length !== 0 &&
   props.archivedTodos.length !== 0) &&props.onNotFound()}




      {!props.Loading && renderTodos(filteredTodos())}

      {!props.Loading &&
  props.stateClickAll &&
  props.totalTodos.length === 0 &&
  props.todos.length !== 0 &&
  props.onAllEmpty()}
{!props.Loading &&
  props.stateClickPending &&
  props.pendingTodos.length === 0 &&
  props.todos.length !== 0 &&
  props.onPendingEmpty()}
{!props.Loading &&
  props.stateClickCompleted &&
  props.completedTodos.length === 0 &&
  props.todos.length !== 0 &&
  props.onCompletedEmpty()}
{!props.Loading &&
  props.stateClickArchived &&
  props.archivedTodos.length === 0 &&
  props.todos.length !== 0 &&
  props.onArchivedEmpty()}
    </div>
  );
}


export { TodoList };
