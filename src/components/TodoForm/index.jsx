import React, { useContext, useEffect, useState } from "react";
import { TodoContext } from "../../contexts/TodoContext";
import { TodoTag } from "../TodoTag";
import { TodoCalendar } from "../TodoCalendar";
import { RandomId } from "../../utils/RandomID";
import { RecommendCategory } from "./ReccommendCategory";
import "./TodoForm.css";

function TodoForm() {
  const randomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor}`;
  };

  const {
    addTodo,
    setOpenModal,
    RecommendCategories,
    setRecommendCategories,
    Categories: categories,
  } = useContext(TodoContext);
  const [newTodoValue, setNewTodoValue] = useState("");
  const [newCategoryValue, setNewCategoryValue] = useState("");
  const [CategoriesList, setCategoriesList] = useState([]);
  const [color, setColor] = useState(randomColor());
  const [selectedTagId, setSelectedTagId] = useState(null);
  const [visible, setVisible] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { RandomId__Category } = RandomId();

  useEffect(() => {
    setVisible(true);
  }, [RecommendCategories]);

  const formatDate = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours());
    const minutes = String(date.getMinutes()).padEnd(2, "0");
    return `${year}/${month}/${day} ${hour}:${minutes}`;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if(CategoriesList.length < 1){
      console.log("llena las categorias")
    }
    if (newTodoValue === "") {
      setOpenModal(false);
    } else {
      addTodo(
        newTodoValue,
        CategoriesList,
        formatDate(startDate),
        formatDate(endDate)
      );
      setOpenModal(false);
    }
  };

  const onCancel = (event) => {
    event.preventDefault();
    setOpenModal(false);
  };

  const onChangeCategory = (event) => {

    const regex = /\w,{2,}\s?/;
    const inputValue = event.target.value.toLowerCase();

    let recommendations = [];

    categories.slice(1).forEach((categoryItem) => {
      const category = categoryItem.category.toLowerCase();
    
      if (category.includes(inputValue) && inputValue !== "" && !CategoriesList.includes(categoryItem)) {
        recommendations.push(categoryItem);
      }
      
    });
    if (
      event.target.value.startsWith(",") ||
      event.target.value.startsWith(" ")
    )
      return;
    if (regex.test(event.target.value)) return;
    let item = event.target.value.split(/,\s*/);
    setRecommendCategories(recommendations);

    setNewCategoryValue(item);
  };
  const onChangeTodo = (event) => {
    setNewTodoValue(event.target.value);
  };

  const addCategory = (event) => {
    event.preventDefault();


    let dict = [];
      if(newCategoryValue.length > 0){
        newCategoryValue.forEach((element) => {
          dict = [
            ...dict,
            { id: RandomId__Category(), category: element, color: color },
          ];


        });
        setColor(randomColor());

        setCategoriesList([...CategoriesList, ...dict]);
        setNewCategoryValue("");
      } 
  
  };

  const handleTagClick = (id) => {
    setSelectedTagId(id === selectedTagId ? null : id);
  };

  const handleColorChange = (color) => {
    setColor(color.hex);
    setCategoriesList(
      CategoriesList.map((item) =>
        item.id === selectedTagId ? { ...item, color: color.hex } : item
      )
    );
  };

  const handleDelete = (id) => {
    const newCategories = CategoriesList.filter((item) => item.id !== id);
    setCategoriesList(newCategories);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setStartDate(date);
    setEndDate(date);
  };

  return (
    <>
      <section>
        <form onSubmit={onSubmit}>
          <label>Add Your Task:</label>
          <textarea
            className="Text-Area_Todo"
            placeholder="Study Full Stack Development"
            value={newTodoValue}
            onChange={onChangeTodo}

          />
          <label>Add Categories:</label>
          <div className="container_TodoTag_TodoCalendar">
            <div className="container_TodoTag__TODO">
              {RecommendCategories.length > 0 && (
                <RecommendCategory
                  RecommendCategories={RecommendCategories}
                  visible={visible}
                  setCategoriesList={setCategoriesList}
                  CategoriesList={CategoriesList}
                  setRecommendCategories ={setRecommendCategories}
                />
              )}

              <textarea
                placeholder="Engineering, Software, Home"
                value={newCategoryValue}
                onChange={onChangeCategory}
                className="Text-Area_Category"
              />
              <button className="button_add--category" onClick={addCategory}>
                Add category
              </button>
              <div className="Container-TodoTag">
                {CategoriesList &&
                  CategoriesList?.map((item) => (
                    <TodoTag
                      key={item.id}
                      id={item.id}
                      text={item.category}
                      color={item.color}
                      isSelected={item.id === selectedTagId}
                      handleClick={handleTagClick}
                      handleColorChange={handleColorChange}
                      handleDelete={handleDelete}
                    />
                  ))}
              </div>
            </div>
            <div className="container-Calendar__TODO">
              <TodoCalendar
                startDate={startDate}
                endDate={endDate}
                selectedDate={selectedDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                handleDateChange={handleDateChange}
              />
            </div>
          </div>

          <div className="TodoForm-buttonContainer">
            <button
              type="button"
              className="TodoForm-button TodoForm-button--cancel"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="TodoForm-button TodoForm-button--add"
            >
              Add TODO
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export { TodoForm };
