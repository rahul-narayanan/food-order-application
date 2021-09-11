import { Modal, Button, Form } from "react-bootstrap";

export const ItemModalDialog = (props) => {
    const { item } = props;

    const renderSize = () => (
        <>
            <h4>Size</h4>
            <Form.Check
                type="checkbox"
                value="1"
                label="Checkbox"
            // onChange={e => setChecked(e.currentTarget.checked)}
            />
        </>
    );

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {item.name}
                    <p>{item.description}</p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {renderSize()}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>Close</Button>
                <Button variant="primary" onClick={props.onHide}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};
