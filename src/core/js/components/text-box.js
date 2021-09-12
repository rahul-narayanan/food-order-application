import { forwardRef } from "react";
import { FloatingLabel, Form } from "react-bootstrap";

export const TextBox = forwardRef((props, ref) => {
    const time = Date.now();

    const prop = { placeholder: "placeholder" };
    if (props.type === "textarea") {
        prop.as = "textarea";
        prop.style = { height: "100px" };
    } else {
        prop.type = "text";
    }

    return (
        <FloatingLabel
            controlId={`floatingInput_${time}`}
            label={props.label}
        >
            <Form.Control
                ref={ref}
                {...prop}
            />
        </FloatingLabel>
    );
});
