import {
    forwardRef, useImperativeHandle, useRef, useState
} from "react";
import { FloatingLabel, Form, InputGroup } from "react-bootstrap";

export const TextBox = forwardRef((props, ref) => {
    const [errMsg, setErrMsg] = useState("");
    const inputRef = useRef(null);

    const getValue = () => inputRef.current?.value.trim() || "";

    useImperativeHandle(ref, () => ({
        getValue,
        isValid: () => getValue() && !errMsg,
        focus: () => inputRef.current?.focus(),
        setError: (err) => setErrMsg(err)
    }));

    const prop = { placeholder: "placeholder" };
    if (props.type === "textarea") {
        prop.as = "textarea";
        prop.style = { height: "100px" };
    } else {
        prop.type = "text";
    }

    return (
        <InputGroup hasValidation>
            <FloatingLabel
                controlId={`floatingInput_${Date.now()}`}
                label={props.label}
            >
                <Form.Control
                    ref={inputRef}
                    {...props}
                    {...prop}
                    isInvalid={Boolean(errMsg)}
                />
                <Form.Control.Feedback type="invalid">
                    {errMsg}
                </Form.Control.Feedback>
            </FloatingLabel>
        </InputGroup>
    );
});
