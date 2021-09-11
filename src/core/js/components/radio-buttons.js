import {
    forwardRef, useCallback, useImperativeHandle, useState
} from "react";
import { Form } from "react-bootstrap";

const RadioButtons = forwardRef(({
    id, title, options, selectedValue: _selectedValue = "",
    onChange = () => {}, inline = false
}, ref) => {
    const [selectedValue, setSelectedValue] = useState(_selectedValue || options[0].value);

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
        <li>
            <h6>{title}</h6>
            <div key={id}>
                {options.map((option) => (
                    <Form.Check
                        type="radio"
                        key={option.value}
                        inline={inline}
                        id={option.value}
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
