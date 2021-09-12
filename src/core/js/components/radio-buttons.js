import {
    forwardRef, useCallback, useEffect, useImperativeHandle, useState
} from "react";
import { Form } from "react-bootstrap";

const RadioButtons = forwardRef(({
    id, title, options,
    selectedValue: _selectedValue = "",
    containerCSS = "",
    onChange = () => {}, inline = false
}, ref) => {
    const [selectedValue, setSelectedValue] = useState(_selectedValue);

    const handleOnChange = useCallback((event) => {
        const newValue = event.currentTarget.value;
        setSelectedValue(newValue);
        onChange(newValue);
    }, [selectedValue]);

    useImperativeHandle(ref, () => ({
        getSelectedValue: () => selectedValue,
        getSelectedOption: () => options.find((_option) => _option.value === selectedValue)
    }));

    return (
        <li className={containerCSS}>
            <h6>{title}</h6>
            <div key={id}>
                {options.map((option) => (
                    <Form.Check
                        type="radio"
                        key={`${id}_${option.value}`}
                        inline={inline}
                        id={`${id}_${option.value}`}
                        value={option.value}
                        label={option.name}
                        onChange={handleOnChange}
                        checked={selectedValue === option.value}
                    />
                ))}
            </div>
        </li>
    );
});

RadioButtons.displayName = "RadioButtons";

export {
    RadioButtons
};
