
import { useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HeaderNavigator } from "../../../core/js/components/header-navigator";
import Categories from "../../../core/js/food-categories";
import Items from "../../../core/js/food-items";
import { OrderTypes, Types } from "../constants";
import { CategoriesListing } from "./category-listing";
import { ItemsListing } from "./items-listing";
import { ItemsSearch } from "./items-search";
import { GO_BACK_TO_SELECT_TYPE } from "../redux/actions";

const getHeaderText = (type, subType) => {
    const result = Types.find(_type => _type.id === type).name;

    if (type === "order") {
        return `${result} - ${OrderTypes.find(_subtype => _subtype.value === subType).name}`
    }

    return result;
}

export const Listing = () => {
    const type = useSelector(state => state?.type || "");
    const subType = useSelector(state => state?.subType || "");

    const selectedCategoryIndex = useSelector(state => state?.selectedCategoryIndex || 0);
    const dispatch = useDispatch();
    const selectedCategoryId = Categories[selectedCategoryIndex].id;

    const searchKey = useSelector(state => state?.searchKey.toLowerCase() || "");

    const items = useMemo(() => Items.filter(item =>
        item.categoryId === selectedCategoryId &&
        (!searchKey || item.name.toLowerCase().includes(searchKey))),
    [selectedCategoryIndex, searchKey]);
    
    const handleOnBackClick = useCallback(() => {
        dispatch({type: GO_BACK_TO_SELECT_TYPE});
    }, []);
    
    if (!type) return "";

    return (
        <div className="item-section-wrapper">
            <HeaderNavigator headerText={getHeaderText(type, subType)} onBack={handleOnBackClick}/>
            <div className="item_section mt-4 mt-md-0">
                <div className="item_section_header">
                    <CategoriesListing categories={Categories}
                        selectedIndex={selectedCategoryIndex} />
                    <ItemsSearch /> 
                </div>
                <div className="tab-content">
                    <div className="row no-gutters">
                        <ItemsListing items={items}/>
                    </div>
                </div>
            </div>
        </div>
    );
}