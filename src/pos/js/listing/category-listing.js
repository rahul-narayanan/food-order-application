
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { CHANGE_CATEGORY_ACTION } from "../redux/actions";

export const CategoriesListing = ({categories = [], selectedIndex = 0}) => {
    const dispatch = useDispatch();

    const handleOnChange = useCallback((index) => {
        dispatch({type: CHANGE_CATEGORY_ACTION, index})
    }, []);

    return (
        <div className="tab_btn_container">
            <div className="nav nav-tabs">
                {categories.map((category, index) => (
                    <div   
                        key={category.id} 
                        className={`owl-item ${selectedIndex === index ? "active" : ""}`}
                        onClick={() => handleOnChange(index)}
                        >
                        <div 
                            className={`tab nav-item ${selectedIndex === index ? "active" : ""} animate__animated animate__zoomIn wow`} 
                            data-wow-duration=".5s" 
                            role="presentation" 
                            data-tip 
                            data-for={category.id}
                            >
                            <img src={category.img} />
                            <h5>{category.name}</h5>
                            {/* <ReactTooltip id={category.id} 
                            place="top" effect="float" type="info">
                                    {category.name}
                                </ReactTooltip> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}