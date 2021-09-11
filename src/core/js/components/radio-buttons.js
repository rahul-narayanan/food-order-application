import {
    forwardRef, useCallback, useImperativeHandle, useState
} from "react";

const RadioButtons = forwardRef(({
    id, label, options, selectedValue: _selectedValue = ""
}, ref) => {
    const [selectedValue, setSelectedValue] = useState(_selectedValue || options[0].value);

    const handleOnChange = useCallback((event) => {
        setSelectedValue(event.currentTarget.value);
    }, [selectedValue]);

    useImperativeHandle(ref, () => ({
        getSelectedValue: () => selectedValue
    }));

    return (
        <div className="form-group mb-4 pb-2">
            <label>{label}</label>
            <div className="row no-gutters align-items-center ml-0">
                {options.map(({ name, value }) => (
                    <div className="col-6 col-sm-6 col-md-6 col-lg-4" key={value}>
                        <div className="custom-control custom-radio">
                            <input
                                type="radio"
                                className="custom-control-input"
                                id={`${id}_${value}`}
                                value={value}
                                checked={selectedValue === value}
                                onChange={handleOnChange}
                            />
                            <label
                                className="custom-control-label"
                                htmlFor={`${id}_${value}`}
                            >
                                <span>{name}</span>
                            </label>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
});

RadioButtons.displayName = "RadioButtons";

export {
    RadioButtons
};
