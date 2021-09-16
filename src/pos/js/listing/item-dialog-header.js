import { Modal, CloseButton } from "react-bootstrap";
import { normalizeI18NText } from "src/core/js/utils";
import { Modifier, Addons } from "src/pos/js/listing/listing-utils";

export const DialogHeader = ({ item, onClose }) => {
    const { name, description = "", price } = item || {};

    return (
        <Modal.Header>
            <div>
                <CloseButton onClick={onClose} />
            </div>
            <Modal.Title id="contained-modal-title-vcenter">
                {name}
                &nbsp;
                &nbsp;
                <span className="small">$</span>
                {price}
                <p>{normalizeI18NText(description)}</p>
            </Modal.Title>
            <div className="actionButtons">
                <Modifier item={item} />
                <Addons item={item} />
            </div>
        </Modal.Header>

    );
};
