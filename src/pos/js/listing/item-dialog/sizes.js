import {
    forwardRef, useCallback, useState
} from "react";
import { useTranslation } from "react-i18next";
import { RadioButtons } from "src/core/js/components/radio-buttons";
import Emitter from "src/core/js/event-emitter";

const REGULAR_SIZE_EXTRA_CHARGE = 2;

const JUMBO_SIZE_EXTRA_CHARGE = 4;

const getAvailableSizes = (translation) => [
    {
        name: translation("common.small"),
        value: "small"
    },
    {
        name: `${translation("common.regular")} (+$${REGULAR_SIZE_EXTRA_CHARGE})`,
        value: "regular"
    },
    {
        name: `${translation("common.jumbo")} (+$${JUMBO_SIZE_EXTRA_CHARGE})`,
        value: "jumbo"
    }
];

export const Sizes = forwardRef((props, ref) => {
    const { t } = useTranslation();
    const SIZES = getAvailableSizes(t);
    const [selectedSize, setSelectedSize] = useState(null);

    const handleOnChange = useCallback((newSize) => {
        const params = {};

        if (selectedSize === "small" && (newSize === "regular" || newSize === "jumbo")) {
            params.type = "increase";
            params.price = newSize === "regular" ? REGULAR_SIZE_EXTRA_CHARGE : JUMBO_SIZE_EXTRA_CHARGE;
        } else if (selectedSize === "regular") {
            params.price = REGULAR_SIZE_EXTRA_CHARGE;
            params.type = newSize === "small" ? "decrease" : "increase";
        } else {
            params.type = newSize === "decrease";
            params.price = newSize === "small" ? JUMBO_SIZE_EXTRA_CHARGE : REGULAR_SIZE_EXTRA_CHARGE;
        }

        Emitter.emit("UPDATE_PRICE_IN_DIALOG_HEADER", params);
        setSelectedSize(newSize);
        props.onChange(newSize);
    }, [selectedSize]);

    return (
        <RadioButtons
            ref={ref}
            id="size-options"
            options={SIZES}
            title={t("common.size_help_message")}
            onChange={handleOnChange}
        />
    );
});
