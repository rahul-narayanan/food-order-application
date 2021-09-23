import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import Categories from "src/core/js/food-categories";
import { useTranslation } from "react-i18next";
import { CATEGORY_SELECTED } from "./redux";
import { usePOSContext } from "../utils";
import { Card } from "react-bootstrap";

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
                        <Card
                            key={`category_${category.id}`}
                            style={{ width: "20rem" }}
                            className="animate__animated animate__zoomIn"
                            onClick={() => handleOnClick(category)}
                        >
                            <Card.Img variant="top" src={category.img} />
                            <Card.Body>
                                <Card.Title as="h3">{category.name}</Card.Title>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};
