import React, { ChangeEvent } from "react";

interface InputProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ value, onChange }) => {
    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder="e.g. 1,2"
            style={{ marginLeft: "8px", padding: "4px" }}
        />
    );
};

export default Input;