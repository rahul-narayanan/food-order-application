import {
    forwardRef, useCallback, useEffect, useImperativeHandle, useState
} from "react";
import { Form } from "react-bootstrap";

const CheckBox = forwardRef(({
    name, value, selected: _selected, onChange = () => {}
}, ref) => {
    const [checked, setChecked] = useState(_selected || false);

    const handleOnChange = useCallback((event) => {
        setChecked(!checked);
    }, [checked]);

    useImperativeHandle(ref, () => ({
        isChecked: () => checked,
        check: () => setChecked(true),
        unCheck: () => setChecked(false)
    }));

    useEffect(() => {
        onChange(checked);
    }, [checked]);

    return (
        <Form.Check
            type="checkbox"
            key={value}
            id={value}
            value={value}
            label={name}
            onChange={handleOnChange}
            checked={checked}
        />
    );
});

CheckBox.displayName = "CheckBox";

export {
    CheckBox
};
