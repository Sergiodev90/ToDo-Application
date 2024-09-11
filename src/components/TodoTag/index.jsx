import { ChromePicker, GooglePicker } from "react-color";
import { ReactComponent as DeleteIcon } from "../../assets/svg/delete.svg";
import "./TodoTag.css";
import { useContext } from "react";
import { TodoMobileContext } from "../../contexts/MobileContext";

function TodoTag(props) {
  const { isMobile } = useContext(TodoMobileContext);
  console.log(isMobile)
  return (
    <>
      <span
        className="todo-tag"
        style={tagStyle(props)}
        onClick={() => props.handleClick(props.id)}
      >
        {props.text}
        <span className="close--Delete">
          <DeleteIcon
            onClick={() => props.handleDelete(props.id)}
            className="DeleteIcon"
          />
        </span>
      </span>
      {props.isSelected &&
        (isMobile ? (
          <ChromePicker
            color={props.color}
            onChange={props.handleColorChange}
            className="ChromePicker"
          />
        ) : (
          <GooglePicker
            color={props.color}
            onChange={props.handleColorChange}
            className="GooglePicker"
          />
        ))}
    </>
  );
}

export { TodoTag };

export const tagStyle = (item) => {
  return {
    backgroundColor: item?.color,
    display: "flex",
    alignItems: "center",
    borderRadius: "12px",
    padding: "0 8px",
    margin: "10px 10px 10px 10px",
    fontSize: "14px",
    wordWrap: "break-word",
    boxSizing: "border-box",
    maxWidth: "300px",
    height: "40px",
    cursor: "pointer",
    opacity: "0.9",
  };
};
