
import { useMemo } from "react";
import { useSelector } from "react-redux";
import Categories from "../../../core/js/food-categories";
import Items from "../../../core/js/food-items";
import { CategoriesListing } from "./category-listing";
import { ItemsListing } from "./items-listing";
import { ItemsSearch } from "./items-search";

export const Listing = () => {
    const selectedCategoryIndex = useSelector(state => state?.selectedCategoryIndex || 0);
    const selectedCategoryId = Categories[selectedCategoryIndex].id;

    const searchKey = useSelector(state => state?.searchKey.toLowerCase() || "");

    const items = useMemo(() => Items.filter(item =>
        item.categoryId === selectedCategoryId &&
        (!searchKey || item.name.toLowerCase().includes(searchKey))),
    [selectedCategoryIndex, searchKey]);

    return (
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
    );
}