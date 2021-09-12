import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import Emitter from "src/core/js/event-emitter";

export const Footer = ({
    onAdd = () => {},
    onCancel = () => {}
}) => {
    const { t } = useTranslation();
    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        Emitter.on("ENABLE_ITEM_DIALOG_ACTION_BUTTON", (_isEnabled) => {
            setIsEnabled(_isEnabled);
        });

        return () => {
            Emitter.off("ENABLE_ITEM_DIALOG_ACTION_BUTTON");
        };
    }, []);

    return (
        <>
            <Button
                variant="secondary"
                onClick={onCancel}
            >
                {t("common.close")}
            </Button>
            <Button
                variant="primary"
                onClick={onAdd}
                disabled={!isEnabled}
            >
                {t("common.add")}
            </Button>
        </>
    );
};
