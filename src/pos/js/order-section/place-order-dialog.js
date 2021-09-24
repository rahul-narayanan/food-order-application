import {
    Modal, Spinner, Button, Card, Form, InputGroup, FormControl, Alert
} from "react-bootstrap";
import { usePOSContext, placeOrder } from "../utils";
import {
    useCallback, useEffect, useRef, useState
} from "react";
import { useTranslation } from "react-i18next";
import { PaymentTypes } from "./order-section-utils";
import { TextBox } from "src/core/js/components/text-box";
import { CheckLg } from "react-bootstrap-icons";
import { showSuccessMessage, showErrorMessage } from "src/core/js/utils";
import { ListingStore } from "../listing-section/init";

const getPaymentName = (value) => PaymentTypes.find((type) => type.value === value).name;

export const PlaceOrderDialog = () => {
    const { t } = useTranslation();
    const {
        showPlaceOrderDialog, closePlaceOrderDialog, total,
        selectedItems, tax, subtotal, handlePlaceOrderSuccess
    } = usePOSContext();

    const [amountDue, setAmountDue] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selectedPaymentOption, setSelectedPaymentOption] = useState(null);

    const [changeDue, setChangeDue] = useState(null);

    const [transactions, setTransactions] = useState([]);

    const cashInputRef = useRef(null);
    const customerNameRef = useRef(null);
    const customerPhoneRef = useRef(null);

    useEffect(() => {
        setAmountDue(parseFloat(total));
    }, [total]);

    useEffect(() => {
        if (!amountDue && customerNameRef.current) {
            customerNameRef.current.focus();
        }
    }, [amountDue]);

    const handleOptionClick = useCallback((type) => {
        setSelectedPaymentOption(type);
    }, []);

    const handleCloseDialog = useCallback(() => {
        closePlaceOrderDialog();
    }, []);

    const handlePaymentSubmit = useCallback((type) => {
        const value = Number(cashInputRef.current.value.trim());
        let transactionAmount = value;

        if (value < amountDue) {
            setAmountDue(amountDue - value);
            setSelectedPaymentOption(null);
        } else {
            if (value >= amountDue) {
                transactionAmount = amountDue;
                setChangeDue(value - amountDue);
            }
            setAmountDue(0);
        }

        setTransactions([
            ...transactions,
            {
                id: type,
                name: getPaymentName(type),
                amount: value.toFixed(2)
            }
        ]);
    }, [amountDue, transactions]);

    const validateCustomerName = useCallback(() => {
        const value = customerNameRef.current.getValue();
        customerNameRef.current.setError(value ? null : t("error.nameRequired"));
        return Boolean(value);
    }, []);

    const validateCustomerPhone = useCallback(() => {
        const value = customerPhoneRef.current.getValue();
        customerPhoneRef.current.setError(value ? null : t("error.phoneRequired"));
        return Boolean(value);
    }, []);

    const handlePlaceOrderClick = useCallback(async () => {
        const isNameValid = validateCustomerName();
        const isPhoneValid = validateCustomerPhone();

        if (isNameValid && isPhoneValid) {
            setLoading(true);
            try {
                const { selectedType, selectedSubType } = ListingStore.getState();
                await placeOrder({
                    orderType: selectedType.id,
                    orderSubType: selectedSubType.id,
                    items: selectedItems,
                    subtotal,
                    tax,
                    total,
                    customerName: customerNameRef.current?.getValue(),
                    customerPhone: customerPhoneRef.current?.getValue(),
                    transactions
                });
                showSuccessMessage(t("common.order_success_message"));
                handlePlaceOrderSuccess();
            } catch (err) {
                showErrorMessage(err);
            }
        }
    }, [amountDue]);

    function renderPaymentOptions() {
        if (!amountDue) return "";

        return (
            <>
                <div className="title">
                    <h3 className="msgText">
                        {transactions.length ? t("common.payment_rest_help_message")
                            : t("common.payment_help_message")}
                    </h3>
                </div>
                <div className="payment-types">
                    {PaymentTypes.map((type) => (
                        <Card
                            key={`paymentType_${type.value}`}
                            className={selectedPaymentOption && selectedPaymentOption.value === type.value ? "active" : ""}
                            onClick={() => handleOptionClick(type)}
                        >
                            <Card.Body>
                                <div className="icon">
                                    {type.icon}
                                </div>
                                <Card.Title as="h5" style={{ textAlign: "center" }}>
                                    {type.name}
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </>
        );
    }

    function renderCashContent() {
        return (
            <div className="cashContent">
                <InputGroup>
                    <InputGroup.Text>
                        {t("common.tenderAmount")}
                        &nbsp;
                        $
                    </InputGroup.Text>
                    <FormControl
                        type="number"
                        defaultValue={amountDue}
                        ref={cashInputRef}
                    />
                </InputGroup>
                <Button className="themeBtn" onClick={() => handlePaymentSubmit("cash")}>
                    {t("common.submit")}
                </Button>
            </div>
        );
    }

    function renderCardContent() {
        return (
            <div className="cardContent">
                <InputGroup>
                    <InputGroup.Text>
                        {t("common.tenderAmount")}
                        &nbsp;
                        $
                    </InputGroup.Text>
                    <Form.Control
                        defaultValue={amountDue}
                        ref={cashInputRef}
                        type="number"
                    />
                </InputGroup>
                <Button className="themeBtn" onClick={() => handlePaymentSubmit("card")}>
                    {t("common.startPayment")}
                </Button>
            </div>
        );
    }

    function renderGiftCardContent() {
        return (
            <div className="giftCardContent">
                <InputGroup>
                    <InputGroup.Text>
                        {t("common.tenderAmount")}
                        &nbsp;
                        $
                    </InputGroup.Text>
                    <Form.Control
                        defaultValue={amountDue}
                        ref={cashInputRef}
                        type="number"
                    />
                </InputGroup>
                <InputGroup>
                    <InputGroup.Text>
                        {t("common.remaining_balance")}
                        &nbsp;
                        $
                    </InputGroup.Text>
                    <Form.Control
                        defaultValue="0"
                        type="number"
                        disabled
                    />
                </InputGroup>
                <Button className="themeBtn" onClick={() => handlePaymentSubmit("giftCard")}>
                    {t("common.submit")}
                </Button>
            </div>
        );
    }

    function renderPaymentContent() {
        if (!selectedPaymentOption || !amountDue) return "";

        switch (selectedPaymentOption.value) {
            case "cash": return renderCashContent();
            case "card": return renderCardContent();
            case "giftCard": return renderGiftCardContent();
            case "storeCredit": return renderGiftCardContent();
            default: return "";
        }
    }

    function renderTransactions(render = true, title = "") {
        if (!render || !transactions.length) return "";

        return (
            <div className="transaction-details">
                <div className="changeDue">
                    <p>
                        {`${title}:`}
                    </p>
                </div>
                <div className="transactions">
                    {transactions.map((transaction, index) => (
                        <Alert key={`${transaction.id}_${index}`} variant="secondary">
                            {`${transaction.name} - $${transaction.amount}`}
                        </Alert>
                    ))}
                </div>
            </div>
        );
    }

    function renderPlaceOrder() {
        if (amountDue) return "";
        return (
            <>
                <div className="transaction-complete-container">
                    {changeDue ? (
                        <div className="changeDue">
                            <p>
                                {t("common.change_due")}
                                :
                            </p>
                        &nbsp;
                            {`$${changeDue.toFixed(2)}`}
                        </div>
                    ) : ""}
                    {renderTransactions(true, t("common.transaction_details"))}
                    <div className="customer-info-container">
                        <div className="changeDue">
                            <p>{t("common.customer_info")}</p>
                        </div>
                        <TextBox
                            label={t("common.customer_name")}
                            ref={customerNameRef}
                            onBlur={validateCustomerName}
                            required

                        />
                        <TextBox
                            label={t("common.customer_phone")}
                            ref={customerPhoneRef}
                            onBlur={validateCustomerPhone}
                            required
                        />
                    </div>
                </div>
                <Modal.Footer>
                    <Button
                        disabled={amountDue !== 0}
                        onClick={handlePlaceOrderClick}
                        className="themeBtn"
                    >
                        {loading ? (
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                style={{ marginRight: "10px" }}
                            />
                        ) : <span className="tick" style={{ marginRight: "10px" }} />}
                        {t("common.place_order")}
                    </Button>
                </Modal.Footer>
            </>
        );
    }

    function renderTitle() {
        if (amountDue) {
            return (
                <Modal.Header closeButton closeLabel={t("common.cancel")}>
                    <Modal.Title className="amountDue">
                        <p style={{ fontSize: "20px", display: "inline-block", marginRight: "5px" }}>
                            {`${t("common.amount_due")}:`}
                        </p>
                        {`$${amountDue.toFixed(2)}`}
                    </Modal.Title>
                </Modal.Header>
            );
        }

        return (
            <Modal.Header>
                <Modal.Title>
                    <h3 className="msgText noBorder">
                        <CheckLg />
                        {t("common.transaction_completed")}
                    </h3>
                </Modal.Title>
            </Modal.Header>
        );
    }

    if (!showPlaceOrderDialog) return "";

    return (
        <Modal
            show
            backdrop="static"
            onHide={handleCloseDialog}
            className="place-order-dialog-container"
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {renderTitle()}
            <Modal.Body>
                {renderTransactions(amountDue > 0, t("common.amount_paid"))}
                {renderPaymentOptions()}
                {renderPaymentContent()}
                {renderPlaceOrder()}
            </Modal.Body>
        </Modal>
    );
};
