
import React,{useState} from 'react';

function useLocalStorage(itemName, initialValue ) {
  const [item, setItem] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false)
  
    React.useEffect(()=>{

      setTimeout(() => {
        try {
          const localStorageItem = localStorage.getItem(itemName);
          let parsedItem;
  
          if(!localStorageItem){
            localStorage.setItem(itemName, JSON.stringify(initialValue));
            parsedItem = initialValue;
          }else{
            parsedItem = JSON.parse(localStorageItem);
          }
  
          setItem(parsedItem);
          setLoading(false);
        } catch (error) {
          if (error) {
            setError(true); // Ahora TypeScript sabe que error es de tipo Error
          }
        }
      }, 1000);
    },[itemName,initialValue])
    
  
    const saveItem = (newItem) =>{
      localStorage.setItem(itemName, JSON.stringify(newItem));
  
      setItem(newItem);
    }
    return {
      item,
      saveItem,
      loading,
      error
    }
  }

export {useLocalStorage}