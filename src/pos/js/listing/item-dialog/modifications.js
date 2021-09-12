import { useCallback, useRef, useState } from "react";
import { OverlayTrigger, Tooltip, CloseButton } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { CheckBox } from "src/core/js/components/check-box";

export const Modifications = ({ item = {} }) => {
    const { description = "" } = item;
    const { t } = useTranslation();
    const [show, setShow] = useState(false);
    const refArr = useRef([]);

    const handleShow = useCallback(() => {
        setShow(!show);
    }, [show]);

    const ingredients = (description.match(/{(.*?)}/g) || []).map((ingredient) => ingredient.replace(/[{}]/g, ""));

    return (
        <div className="modifications">
            {!show ? (
                <div
                    className="link"
                    onClick={handleShow}
                >
                    {t("common.modify")}
                </div>
            ) : ""}

            {show ? (
                <div className="content animate__animated animate__zoomIn wow">
                    <div className="title">
                        {t("common.modify")}
                        <OverlayTrigger
                            placement="right"
                            overlay={(
                                <Tooltip id="tooltipClose">
                                    {t("common.close")}
                                </Tooltip>
      )}
                        >
                            <CloseButton onClick={handleShow} />
                        </OverlayTrigger>

                    </div>
                    {ingredients.map((ingredient, index) => (
                        <CheckBox
                            key={index}
                            ref={(el) => refArr.current[index] = el}
                            name={`${t("common.no")} ${ingredient}`}
                            value={ingredient.toLowerCase()}
                        />
                    ))}
                </div>
            ) : ""}
        </div>
    );
};
