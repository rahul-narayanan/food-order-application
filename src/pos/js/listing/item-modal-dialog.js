
import { Modal, Button } from 'react-bootstrap';

export const ItemModalDialog = (props) => {
    const { item } = props;
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
                <h4>Size</h4>
                <p>
                    Required
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>Close</Button>
                <Button variant="primary" onClick={props.onHide}>Place order</Button>
            </Modal.Footer>
        </Modal>
    );
}