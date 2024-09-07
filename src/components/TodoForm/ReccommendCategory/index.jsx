import { tagStyle } from "../../TodoTag";



export function RecommendCategory(props){



      const HandleAddRecommendedCategory = (category) => {
          // Verificamos si el ID del item ya está en la lista de IDs memoizada
          props.setCategoriesList([...props.CategoriesList,category])
          const newRecommendations = props.RecommendCategories.filter(item => item !== category)
          props.setRecommendCategories(newRecommendations)
      };
  
    return(
          <>
          
            <div className="container-Recommended-Todos">
              
              <ul
                className={`Container-List-Reccommend fade-in ${
                  props.visible ? "visible" : ""
                }`}
              >
                {props.RecommendCategories.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => HandleAddRecommendedCategory(item)}
                    style={tagStyle(item)}
                  >
                    {item.category}
                  </li>
                ))}
                
              </ul>
            </div>
            
            </>
    );
}