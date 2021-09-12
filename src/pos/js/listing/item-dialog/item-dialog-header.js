import { useCallback, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Emitter from "src/core/js/event-emitter";
import { normalizeI18NText } from "src/core/js/utils";

export const DialogHeader = ({ item }) => {
    const { name, description, price: _price } = item;
    const [price, setPrice] = useState(_price);

    const calculateAndSetPrice = useCallback(({ type, price: __price }) => {
        let newPrice;
        if (type === "increase") {
            newPrice = (Number(price) + Number(__price)).toFixed(2);
        } else {
            newPrice = (Number(price) - Number(__price)).toFixed(2);
        }
        setPrice(newPrice);
    }, [price]);

    useEffect(() => {
        Emitter.on("UPDATE_PRICE_IN_DIALOG_HEADER", calculateAndSetPrice);

        return () => {
            Emitter.off("UPDATE_PRICE_IN_DIALOG_HEADER");
        };
    }, [price]);

    return (
        <Modal.Header closeButton>
            <Modal.Title className="single" id="contained-modal-title-vcenter">
                {name}
                <span className="right">
                    {`$ ${price}`}
                </span>
                <p>{normalizeI18NText(description)}</p>
            </Modal.Title>
        </Modal.Header>

    );
};
