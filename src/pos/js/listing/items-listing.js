import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ITEM_SELECTED } from "./redux";

const renderItemName = (name) => {
    name = name.substr(0, name.lastIndexOf(" "));
    if (name.length > 19) {
        return <h3>{name}</h3>;
    }

    return <h2>{name}</h2>;
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
                        <div
                            key={item.id}
                            className="item animate__animated animate__zoomIn wow"
                            data-wow-duration=".5s"
                            role="presentation"
                            data-tip
                            data-for={item.id}
                            onClick={() => handleOnClick(item)}
                        >
                            <img src={item.img} />
                            {renderItemName(item.name)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
