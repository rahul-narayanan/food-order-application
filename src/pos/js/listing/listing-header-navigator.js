import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HeaderNavigator } from "src/core/js/components/header-navigator";
import { OrderTypes, Types } from "../constants";
import { HANDLE_GO_BACK_CLICK } from "./redux";

const getHeaderText = (type, subType) => {
    const result = Types.find((_type) => _type.id === type.id).name;

    if (type.id === "order" && subType) {
        return (
            <>
                {result}
                <p>
                &nbsp;
                    -
                    &nbsp;
                    {OrderTypes.find((_subtype) => _subtype.value === subType.value).name}
                </p>
            </>
        );
    }

    return result;
};

export const ListingHeaderNavigator = () => {
    const type = useSelector((state) => state?.selectedType || null);
    const subType = useSelector((state) => state?.selectedSubType || null);
    const dispatch = useDispatch();

    const handleOnBackClick = useCallback(() => {
        dispatch({ type: HANDLE_GO_BACK_CLICK });
    }, []);

    if (!type) return "";

    return (
        <HeaderNavigator
            headerText={getHeaderText(type, subType)}
            onBack={handleOnBackClick}
        />
    );
};
