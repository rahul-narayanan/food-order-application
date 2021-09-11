import { useMemo, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Categories from "../../../core/js/food-categories";
import {
    Combos, DialogHeader, DrinkOptions, Modifications, Sizes
} from "./utils";

export const ItemModalDialog = (props) => {
    const { item } = props;
    const { t } = useTranslation();

    const selectedCategory = useMemo(() => Categories.find(
        (_category) => _category.id === item.categoryId
    ), [item]);

    const comboRef = useRef(null);
    const sizeRef = useRef(null);
    const drinksRef = useRef(null);

    function renderSize() {
        if (selectedCategory?.isAvailableInDiffSizes) {
            return (
                <Sizes ref={sizeRef} />
            );
        }
        return "";
    }

    function renderBody() {
        return (
            <>
                <div className="content">
                    <ul>
                        {renderSize()}
                        <Combos ref={comboRef} selectedCategory={selectedCategory} />
                        <DrinkOptions ref={drinksRef} />
                    </ul>
                </div>
                <Modifications item={item} />
            </>
        );
    }

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            className="item-modal-dialog-container"
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <DialogHeader item={item} />
            <Modal.Body>
                {renderBody()}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>Close</Button>
                <Button variant="primary" onClick={props.onHide}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};
