import { createPortal } from "react-dom";
import './ModalMenu.css'

function ModalMenu({children}){
    return createPortal(
        <div className="Modal-Background-Mobile">
            {children}
        </div>,
        
        document.getElementById("ModalMobile")
    )
    

}

export { ModalMenu }
