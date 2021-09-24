import i18n from "src/i18n";

const Status = {
    0: i18n.t("status.placed"),
    1: i18n.t("status.inprogress"),
    2: i18n.t("status.ready"),
    3: i18n.t("status.completed")
};

export const getPlacedStatus = () => 0;

export const getInProgressStatus = () => 0;

export const getReadyStatus = () => 2;

export const getCompletedStatus = () => 3;

export const getStatusText = (value = "0") => {
    value = Number(value);
    switch (value) {
        case 0: return <span className="status placed">{Status[value]}</span>;
        case 1: return <span className="status inprogress">{Status[value]}</span>;
        case 2: return <span className="status ready">{Status[value]}</span>;
        case 3: return <span className="status completed">{Status[value]}</span>;
        default: return "";
    }
};
