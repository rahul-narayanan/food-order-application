import { Modal, Button } from "react-bootstrap";
import { normalizeI18NText } from "src/core/js/utils";

export const DialogHeader = ({ item }) => {
    const { name } = item || {};

    return (
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
                {name}
                <p>{normalizeI18NText(item.description)}</p>
            </Modal.Title>
            <div className="actionButtons">
                <Button variant="outline-secondary">Modifier</Button>
                <Button variant="outline-secondary">Add-ons</Button>
            </div>
        </Modal.Header>

    );
};
