
export const MainContainer = ({containerCSS = "", view}) => {
    return (
        <div className={containerCSS}>
            {view}
        </div>
    );
}