import React, {  useEffect, useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { RandomId} from '../../utils/RandomID'

const TodoContext = React.createContext();

function TodoProvider({ children,id, parent }) {
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage('TODOS_V1', []);

  const {
    item: Categories,
    saveItem: saveCategories,
    // loading: loadingCategories,
    // error: errorCategories,
  } = useLocalStorage('CATEGORIES_V1', [{id:1,category:'All'}]);

  const [searchValue, setSearchValue] = useState('');
  const [searchCategory,setSearchCategory] = useState('All')
  const [openModal, setOpenModal] = useState(false);
  const [stateClickAll,setStateClickAll] = useState(true);
  const [stateClickCompleted,setStateClickCompleted] = useState(false);
  const [stateClickArchived,setStateClickArchived] = useState(false);
  const [stateClickPending, setStateClickPending] = useState(false)
  const [RecommendCategories,setRecommendCategories] = useState([]);


  const [completed,setCompleted] = useState(false)
  const [all,setAll] = useState(true)
  const [pending,setPending] = useState(true)
  const [archived,setArchived] = useState(false)
  const { RandomId__Todo } = RandomId()






  const completedTodos = todos.filter(todo => !!todo.completed);
  const totalTodos = todos.filter((todo) => todo.inAll);
  const pendingTodos = todos.filter((todo) => todo.pending);
  const archivedTodos = todos.filter((todo) => todo.inArchived);


  // const RandomId = () =>{
  //   return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  // }

  const searchedTodos = todos.filter(
    (todo) => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText) 
    }
  );
  
  const searchedTodosByCategory= todos.filter(todo => {

    
    const todoCategories = todo.categories.find(category => category.category === searchCategory)
    
    return todoCategories !== undefined          
  });


  const validateRepeatedCategories = (categoriesList) => {
    const categoriesLocalStorage = new Set(Categories.map(item => item.id));
    const newCategories = [...Categories];
  
    categoriesList.forEach(category => {
      if (!categoriesLocalStorage.has(category.id)) {
        newCategories.push(category);
        categoriesLocalStorage.add(category.id); // Añadir al Set para futuras comprobaciones
      }
    });
  
    saveCategories(newCategories);
    return { newCategories };
  };
  
  const addTodo = (text, categories, startDate, endDate) => {
    const newTodos = [...todos];
  
    newTodos.push({
      id: RandomId__Todo(),
      text: text,
      completed: false,
      categories: categories,
      pending: true,
      inArchived: false,
      inAll: true,
      startDate: startDate,
      endDate: endDate,
    });
  
    validateRepeatedCategories(categories);
    saveTodos(newTodos);
  };
  
  const editTodoText =({newText,id,to,color}) =>{
      if(to === 'Todos'){
        const newTodos = todos.map((item)=>{
          if(item.id === id){
            return {
                ...item,
                text:newText
            }
          }
          return item
      })
      saveTodos(newTodos)
      }
      if (to === 'Categories') {
        const newTodos_Categories = todos.map((item) => {
          const updatedCategories = item.categories.map((category) => {
            if (category.id === id) {
              return {
                category: newText,
                color:color
              };
            }
            return category
          });
      
          // Retornar el objeto item con las categorías actualizadas
          return {
            ...item,
            categories: updatedCategories
          };
        });
        const newCategories = Categories.map((item) =>{
          if(item.id === id){
            return {
              ...item,
              category:newText,
              color:color
            }
          }
          return item
        })
        saveCategories(newCategories)
        saveTodos(newTodos_Categories);
      }
    
    
  }
  const completeTodo = (id) => {
    setCompleted(!completed )
    setPending(!pending)
    
    const newTodos = todos.map((Element) => {
      if(Element.id === id){
        return {
          ...Element,
          completed: completed,
          pending:pending,
          inArchived:false

        }
      }
      return Element
    })
    saveTodos(newTodos)
  };

  useEffect(() => {
    const laststatus = todos.filter(todo => todo.id === id )

    if (!id || !parent) return; // Asegúrate de que id y parent estén definidos
    

    if (parent === 'all') {
      setStateClickAll(true);
      setStateClickPending(false);
      setStateClickCompleted(false);
      setStateClickArchived(false);
    } else if (parent === 'pending') {
      setStateClickAll(false);
      setStateClickPending(true);
      setStateClickCompleted(false);
      setStateClickArchived(false);
    } else if (parent === 'completed') {
      setStateClickAll(false);
      setStateClickPending(false);
      setStateClickCompleted(true);
      setStateClickArchived(false);
    } else if (parent === 'archived') {
      setStateClickAll(false);
      setStateClickPending(false);
      setStateClickCompleted(false);
      setStateClickArchived(true);
    }
    

    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        switch (parent) {
          case 'all':

            return {
              ...todo,
              completed: true,
              pending: true,
              inArchived: false,
              inAll: true,
            };
  
          case 'pending':
            return {
              ...todo,
              completed: false,
              pending: true,
              inArchived: false,
              inAll: true,
            };
  
          case 'completed':
            return {
              ...todo,
              completed: true,
              pending: false,
              inArchived: false,
              inAll: true,
            };
  
          case 'archived':
            return {
              ...todo,
              completed: false,
              pending: false,
              inArchived: true,
              inAll: false,
              lastStatus:laststatus
            };
  
          default:
            return todo;
        }
      }
      return todo;
    });
  
    saveTodos(newTodos); // Guarda los cambios
  }, [parent, id]);
  
  const unArchivedTodo = (id) =>{
    const lastStatus = todos.find(todo =>{
      return todo.id === id
    })
    const tmp = lastStatus.lastStatus[0]
    const newTodos = todos.map(todo => {
      if(todo.id === id){
        return {
          ...todo,
          inAll: tmp.inAll,
          inArchived:tmp.inArchived,
          completed:tmp.completed,
          pending:tmp.pending
        }
      }
      return todo
    })
    saveTodos(newTodos)
  }

  const archiveTodo = (id) =>{
    const laststatus = todos.filter(todo => todo.id === id )
    const newTodos = todos.map((element) =>{
      if(element.id === id){
        return {
          ...element,
          completed:false,
          pending:false,
          inArchived: true,
          inAll:false,
          lastStatus:laststatus
        }
      }
      return element
    })
    saveTodos(newTodos)
  }

  const deleteTodo = (id) => {
    // Filtramos para obtener los todos que no coinciden con el id a eliminar
    const newTodos = todos.filter((todo) => todo.id !== id);
  
    // Obtenemos las categorías que se deben eliminar, asociadas al todo que será eliminado
    const categoriesToDelete = todos
      .filter((todo) => todo.id === id)
      .flatMap((todo) => todo.categories.map((cat) => cat.id));
    
  
    // Obtenemos los IDs de las categorías que aún están en uso en los todos restantes
    const categoriesInRemainingTodos = newTodos.flatMap((todo) =>
      todo.categories.map((cat) => cat.id)
    );
  
    // Filtramos las categorías almacenadas, eliminando solo aquellas que no se usan en los todos restantes
    const newCategories = Categories.filter(
      (category) => !categoriesToDelete.includes(category.id) || categoriesInRemainingTodos.includes(category.id)
    );
  
    // Guardamos los nuevos estados de todos y categorías
    saveTodos(newTodos);
    saveCategories(newCategories);
  };








  return (
    <TodoContext.Provider value={{
      loading,
      error,
      completedTodos,
      totalTodos,
      searchValue,
      setSearchValue,
      searchedTodos,
      completeTodo,
      deleteTodo,
      openModal,
      setOpenModal,
      addTodo,
      todos,
      stateClickCompleted,
      setStateClickCompleted,
      stateClickArchived,
      setStateClickArchived,
      stateClickAll,
      setStateClickAll,
      setStateClickPending,
      stateClickPending,
      completed,
      archived,
      all,
      setCompleted,
      setArchived,
      setAll,
      pending,
      setPending,
      Categories,
      setSearchCategory,
      searchedTodosByCategory,
      searchCategory,
      editTodoText,
      archiveTodo,
      pendingTodos,
      archivedTodos,
      unArchivedTodo,
      setRecommendCategories,
      RecommendCategories,
      
    }}>
      {children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };
