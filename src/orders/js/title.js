import { useTranslation } from "react-i18next"

export const Title = () => {
    const { t } = useTranslation();
    return (
        <div className="page_title">
            <div className="row align-items-center mx-0">
                <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 p-0">
                    <div className="title_inner d-flex">
                        <h1 className="d-flex align-items-center">
                            {t("menus.orders")}
                        </h1>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 p-0 d-flex">
                    <form className="search_box col-12 col-sm-12 col-md-12 col-lg-8 col-xl-7 p-0 px-lg-3 mt-3 mt-lg-0 pb-3 pb-md-0 ml-auto">
                        <div className="form-group d-flex">
                            <div className="input-group-prepend">
                                <div className="input-group-text"><i className="zmdi zmdi-search"></i></div>
                            </div>
                            <input type="text" className="form-control" placeholder={t("common.search")} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}