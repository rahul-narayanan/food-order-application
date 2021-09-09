
export const HeaderNavigator = ({ headerText, onBack}) => {
    return (
        <div className="header-navigator">
            <div className="backBtn" onClick={onBack}>
                <i className="back-arrow" />
            </div>
            <div className="headerText">
                {headerText}
            </div>
        </div>
    )
}