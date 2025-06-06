import React, { ChangeEvent } from "react";

export interface InputImprovedProps {
    /**
     * The current value of the input (controlled component).
     */
    value: string;
    /**
     * Called whenever the user types/edits the input.
     */
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    /**
     * Placeholder text to show when the input is empty.
     */
    placeholder?: string;
    /**
     * Optional CSS classname for extra styling.
     */
    className?: string;
}

/**
 * A simple, reusable, controlled text‐input.
 * Consumes `value` and `onChange` via props.
 */
const InputImproved: React.FC<InputImprovedProps> = ({
                                         value,
                                         onChange,
                                         placeholder = "",
                                         className = "",
                                     }: InputImprovedProps) => {
    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={className}
            style={{
                padding: "8px 12px",
                fontSize: "1rem",
                borderRadius: 4,
                border: "1px solid #ccc",
                outline: "none",
                width: "100%",
                boxSizing: "border-box",
            }}
        />
    );
};

export default InputImproved;