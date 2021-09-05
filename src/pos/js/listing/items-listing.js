
import VegIcon from "../../img/veg_icon.png";
import NonVegIcon from "../../img/nonveg_icon.png";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ADD_ITEM_ACTION } from "../redux/actions";
import ReactTooltip from "react-tooltip";

const getTrimmedDesc = ({ id, description = "" }, maxLen = 95) => {
    if (!description) return <p className="noDesc" />;

    return description.length > maxLen ? (
        <>
            <p data-tip data-for={`${id}_desc`}>
                {description.length > maxLen ?`${description.substr(0, maxLen)}...` : description}
            </p>
            <ReactTooltip
                className="item-desc-tooltip"
                id={`${id}_desc`}
                place="top"
                effect="solid"
                >
                {description}
            </ReactTooltip>
        </>
    ): (
        <p>
            {description}
        </p>
    )
} 
export const ItemsListing = ({ items = [] }) => {
    const dispatch = useDispatch();

    const handleOnClick = useCallback((item) => {
        dispatch({type: ADD_ITEM_ACTION, item})
    }, []);

    return items.map((item) => (
        <div
            key={item.id}
            className="col col-6 col-sm-6 col-md-6 col-lg-4 col-xl-3"
            onClick={() => handleOnClick(item)}
        >
            <div className="item animate__animated animate__zoomIn wow">
                <div className="item_img center_img">
                    <img src={item.img} className="crop_img" />
                </div>
                <div className="text_box">
                    <h2>{item.name}</h2>
                    {getTrimmedDesc(item)}
                    <h3 className="d-flex">
                        <img src={item.veg ? VegIcon : NonVegIcon} />
                        &nbsp;
                        $
                        &nbsp;
                        {parseFloat(item.price).toFixed(2)}
                    </h3>
                </div>
            </div>
        </div>
    ));
}