import React from "react";
import { ReactComponent as Loading} from '../../assets/svg/Loading.svg'
import "./TodoLoading.css";

function TodosLoading() {
    return (
        <div className="Container-Loading-SVG">
            <Loading className="Loading-ITEM"/>
        </div>
    );
}

export { TodosLoading }