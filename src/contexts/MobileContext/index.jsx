import React,{createContext,useState,useEffect} from "react"

const TodoMobileContext = createContext();

function TodoMobileProvider({children}){
    const [isOpenToggleMobile, setIsOpenMobile] = useState(false);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 600);
        };
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);
    
    return(
        <TodoMobileContext.Provider value={{
        isMobile,
        isOpenToggleMobile,
        setIsOpenMobile}}>
            {children}
        </TodoMobileContext.Provider>
    );
}


export {TodoMobileContext,TodoMobileProvider}