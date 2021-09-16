import {
    forwardRef, useCallback, useImperativeHandle, useState
} from "react";

export const IncreaseDecreaseCounter = forwardRef(({
    count: _count = 0,
    onIncrement = () => {},
    onDecrement = () => {}
}, ref) => {
    const [count, _setCount] = useState(_count);

    const handleClick = useCallback((event) => {
        event.stopPropagation();
    }, []);

    const handleIncrementClick = useCallback((event) => {
        _setCount(count + 1);
        onIncrement(count + 1);
    }, [count]);

    const handleDecrementClick = useCallback(() => {
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
                <i className="zmdi zmdi-minus" onClick={handleDecrementClick} />
                <strong>{count}</strong>
                <i className="zmdi zmdi-plus" onClick={handleIncrementClick} />
            </h3>
        </div>
    );
});
