import React from "react";

type Props = {
    labelText?: string;
}

const InputText = ({ labelText, ...rest }: Props) => {
    return (
        <>
            {labelText && <label>{labelText}</label>}
            <input {...rest} />
        </>
    )
}

export default InputText;