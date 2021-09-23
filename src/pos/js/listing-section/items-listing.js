import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { normalizeI18NText } from "src/core/js/utils";
import { ITEM_SELECTED } from "./redux";
import { Card } from "react-bootstrap";

const renderItemName = (name) => {
    name = normalizeI18NText(name);
    name = name.substr(0, name.lastIndexOf(" "));
    return name;
};

export const ListingItems = () => {
    const selectedCategory = useSelector((state) => state?.selectedCategory || null);
    const dispatch = useDispatch();

    const handleOnClick = useCallback((_selectedItem) => {
        dispatch({ type: ITEM_SELECTED, selectedItem: _selectedItem });
    }, []);

    if (!selectedCategory) return "";

    return (
        <div className="listing-section-wrapper">
            <div className="item-section-wrapper categories">
                <div className="title">
                    <h2>{selectedCategory.name}</h2>
                </div>
                <div className="item-section">
                    {selectedCategory.items.map((item) => (
                        <Card
                            key={`item_${item.id}`}
                            style={{ width: "20rem" }}
                            className="animate__animated animate__zoomIn"
                            onClick={() => handleOnClick(item)}
                        >
                            <Card.Img variant="top" src={item.img} />
                            <Card.Body>
                                <Card.Title as="h3">{renderItemName(item.name)}</Card.Title>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};
