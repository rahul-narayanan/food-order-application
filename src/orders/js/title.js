import { useTranslation } from "react-i18next";
import { Search } from "react-bootstrap-icons";

export const Title = () => {
    const { t } = useTranslation();
    return (
        <div className="page_title">
            <div className="title_inner d-flex">
                <h1 className="d-flex align-items-center">
                    {t("menus.orders")}
                </h1>
            </div>
            <div className="search-container">
                <form className="search_box">
                    <div className="form-group d-flex">
                        <div className="search-icon"><Search /></div>
                        <input type="text" className="form-control" placeholder={t("common.search")} />
                    </div>
                </form>
            </div>
        </div>
    );
};
