import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import Categories from "src/core/js/food-categories";
import { useTranslation } from "react-i18next";
import { CATEGORY_SELECTED } from "./redux";
import { usePOSContext } from "src/pos/js/utils";

export const ListingCategory = () => {
    const state = useSelector((_state) => _state || {});
    const { selectedItems } = usePOSContext();
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const handleOnClick = useCallback((category) => {
        dispatch({ type: CATEGORY_SELECTED, selectedCategory: category });
    }, []);

    // If type not selected, dont render
    // If type is order and subtype not selected, dont render
    // If category already selected, dont render
    if (!state.selectedType || (state.selectedType.id === "order" && !state.selectedSubType) || state.selectedCategory) {
        return "";
    }

    return (
        <div className="listing-section-wrapper">
            <div className="item-section-wrapper categories">
                <div className="title">
                    <h2 className="msgText">
                        {selectedItems && selectedItems.length > 0
                            ? t("common.category_help_message1") : t("common.category_help_message")}
                    </h2>
                </div>
                <div className="item-section">
                    {Categories.map((category) => (
                        <div
                            key={category.id}
                            className="item animate__animated animate__zoomIn wow"
                            data-wow-duration=".5s"
                            role="presentation"
                            data-tip
                            data-for={category.id}
                            onClick={() => handleOnClick(category)}
                        >
                            <img src={category.img} />
                            {category.name.length > 19
                                ? <h3>{category.name}</h3>
                                : <h2>{category.name}</h2>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
