import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ITEM_SELECTED } from "./redux";

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
                            {item.name.length > 19
                                ? <h3>{item.name}</h3>
                                : <h2>{item.name}</h2>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
