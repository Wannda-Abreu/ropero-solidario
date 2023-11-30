import React from "react";

interface InputFieldProps {
    label: string;
    type: string;
    value: string;
    name?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}



const InputField: React.FC<InputFieldProps> = ({
    label, type, value, onChange, name
}) => {
    return( 
        <div className="inputField">
            <label>{label}</label>
            
            <input type= {type} value={value} onChange= {onChange} name={name} />
        </div>
    )
}

export default InputField;