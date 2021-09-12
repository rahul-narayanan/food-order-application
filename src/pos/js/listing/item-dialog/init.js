import { Modal } from "react-bootstrap";
import { DialogHeader } from "./item-dialog-header";
import { ItemDialogBody } from "./item-dialog-body";
import { Footer } from "./item-dialog-footer";
import { useCallback, useRef } from "react";

export const ItemModalDialog = (props) => {
    const { item } = props;

    const bodyRef = useRef(null);

    const handleAddItem = useCallback(() => {

    }, []);

    const scrollToBottom = useCallback(() => {
        setTimeout(() => {
            if (!bodyRef.current) return;

            const el = bodyRef.current.getElementsByClassName("item-dialog-scroll-div")[0];
            if (!el) return;

            el.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, []);

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            className="item-modal-dialog-container"
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <DialogHeader item={item} />
            <Modal.Body ref={bodyRef}>
                <ItemDialogBody item={item} scrollToBottom={scrollToBottom} />
            </Modal.Body>
            <Modal.Footer>
                <Footer onAdd={handleAddItem} onCancel={props.onHide} />
            </Modal.Footer>
        </Modal>
    );
};
