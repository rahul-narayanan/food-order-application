import {
    forwardRef, useCallback, useImperativeHandle, useState
} from "react";

export const IncreaseDecreaseCounter = forwardRef(({
    count: _count = 0,
    limit = 100,
    onIncrement = () => {},
    onDecrement = () => {}
}, ref) => {
    const [count, _setCount] = useState(_count);

    const handleClick = useCallback((event) => {
        event.stopPropagation();
    }, []);

    const handleIncrementClick = useCallback((event) => {
        if (count >= limit) {
            return;
        }
        _setCount(count + 1);
        onIncrement(count + 1);
    }, [count]);

    const handleDecrementClick = useCallback(() => {
        if (count <= 0) {
            return;
        }
        _setCount(count - 1);
        onDecrement(count - 1);
    }, [count]);

    useImperativeHandle(ref, () => ({
        setCount: (newCount) => _setCount(newCount)
    }));

    if (!count) return "";

    return (
        <div className="increment-decrement-counter-container" onClick={handleClick}>
            <h3 className="d-flex align-items-center">
                <i
                    className="zmdi zmdi-minus"
                    onClick={handleDecrementClick}
                    style={count <= 0 ? { opacity: "0.5" } : {}}
                />
                <strong>{count}</strong>
                <i
                    className="zmdi zmdi-plus"
                    onClick={handleIncrementClick}
                    style={count >= limit ? { opacity: "0.5" } : {}}
                />
            </h3>
        </div>
    );
});
