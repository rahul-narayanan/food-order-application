import {
    forwardRef,
    useCallback, useImperativeHandle, useState
} from "react";
import BootstrapSelect from "react-bootstrap-select-dropdown";

export const SelectBox = forwardRef(({
    options, placeholder, className, onChange = () => {}
}, ref) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionSelect = useCallback((selectedSide) => {
        const selectedId = selectedSide.selectedKey[0];
        const newOption = options.find((option) => option.labelKey === selectedId);
        if (newOption) {
            setSelectedOption(newOption);
            onChange(newOption);
        }
    }, [selectedOption]);

    useImperativeHandle(ref, () => ({
        getSelectedValue: () => selectedOption.labelKey,
        getSelectedOption: () => selectedOption
    }));

    return (
        <BootstrapSelect
            ref={ref}
            className={className}
            placeholder={placeholder}
            options={options}
            onChange={handleOptionSelect}
        />
    );
});
