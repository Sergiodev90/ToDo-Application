import React, { useContext } from 'react';
import './IconsMenu.css'
import { TodoMobileContext } from '../../../contexts/MobileContext';


const MenuToggle = () => {

  const {isOpenToggleMobile,setIsOpenMobile} = useContext(TodoMobileContext)
  const handleClick = () => {
    setIsOpenMobile(!isOpenToggleMobile);
  };

  return (
    <div className={`${isOpenToggleMobile ? "toggle active": "toggle"} `} onClick={handleClick}>
        <span></span>
        <span></span>
        <span></span>
    </div>
  );
};

export default MenuToggle;
