import { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { debounce } from "src/core/js/utils";
import { UPDATE_SEARCH_KEY } from "../redux/actions";

export const ItemsSearch = () => {
    const inputRef = useRef(null);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const updateSearchKey = useCallback(() => {
        const value = inputRef.current?.value.trim() || "";
        dispatch({ type: UPDATE_SEARCH_KEY, searchKey: value });
    }, []);

    const handleSearchInputKeyUp = debounce(() => updateSearchKey());

    return (
        <form className="search_box animate__animated animate__zoomIn wow">
            <div className="form-group d-flex">
                <div className="input-group-prepend">
                    <div className="input-group-text"><i className="zmdi zmdi-search" /></div>
                </div>
                <input
                    type="search"
                    className="form-control"
                    placeholder={t("common.search_items")}
                    ref={inputRef}
                    onKeyUp={handleSearchInputKeyUp}
                />
            </div>
        </form>
    );
};
