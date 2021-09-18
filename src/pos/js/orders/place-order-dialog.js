import { Modal, Card } from "react-bootstrap";
import { usePOSContext } from "../utils";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { PaymentTypes } from "src/pos/js/constants";

export const PlaceOrderDialog = () => {
    const { t } = useTranslation();
    const { showPlaceOrderDialog, closePlaceOrderDialog, total } = usePOSContext();

    const handleCloseDialog = useCallback(() => {
        closePlaceOrderDialog();
    }, []);

    function renderOptions() {
        return PaymentTypes.map((type) => (
            <Card
                key={`paymentType_${type.id}`}
                style={{ width: "7rem", height: "7rem", margin: "10px" }}
                className="animate__animated animate__zoomIn"
            >
                <Card.Body>
                    <Card.Title as="h3" style={{ textAlign: "center" }}>
                        {type.icon}
                        <div>{type.name}</div>
                    </Card.Title>
                </Card.Body>
            </Card>
        ));
    }

    if (!showPlaceOrderDialog) return "";

    return (
        <Modal
            show
            onHide={handleCloseDialog}
            className="item-dialog-container"
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <p style={{ fontSize: "20px", display: "inline-block" }}>
                        {t("common.amount_to_pay")}
                    </p>
                    {` - $ ${total}`}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="item-section">
                    {renderOptions()}
                </div>
            </Modal.Body>
        </Modal>
    );
};
