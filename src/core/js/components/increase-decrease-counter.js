import {
    forwardRef, useCallback, useImperativeHandle, useState
} from "react";

export const IncreaseDecreaseCounter = forwardRef(({
    count: _count = 0,
    onIncrement = () => {},
    onDecrement = () => {}
}, ref) => {
    const [count, _setCount] = useState(_count);

    const handleIncrementClick = useCallback(() => {
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
        <div className="increment-decrement-counter-container">
            <h3 class="d-flex align-items-center">
                <i class="zmdi zmdi-minus" onClick={handleDecrementClick} />
                <strong>{count}</strong>
                <i class="zmdi zmdi-plus" onClick={handleIncrementClick} />
            </h3>
        </div>
    );
});
