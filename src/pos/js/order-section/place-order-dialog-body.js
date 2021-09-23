import { useCallback, useState } from "react";
import { Modal, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { HeaderNavigator } from "src/core/js/components/header-navigator";
import { PaymentTypes } from "./order-section-utils";

export const PlaceOrderDialogBody = () => {
    const { t } = useTranslation();

    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionClick = useCallback((type) => {
        setSelectedOption(type);
    }, []);

    const handleDeSelectOption = useCallback((type) => {
        setSelectedOption(null);
    }, []);

    function renderContent() {
        if (!selectedOption) return "";

        const Content = selectedOption.content;

        return (
            <>
                <HeaderNavigator
                    headerText={selectedOption.name}
                    onBack={handleDeSelectOption}
                />
                <Content />
            </>
        );
    }

    function renderOptions() {
        if (selectedOption) return "";

        return (
            <>
                <div className="title">
                    <h3 className="msgText">{t("common.payment_help_message")}</h3>
                </div>
                <div className="payment-types">
                    {PaymentTypes.map((type) => (
                        <Card
                            key={`paymentType_${type.value}`}
                            // className={}
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

    return (
        <Modal.Body>
            {renderOptions()}
            {renderContent()}
        </Modal.Body>
    );
};
