import React from "react";
import Tooltip from "./Tooltip";

export interface InputWithTooltipProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "style"> {
    /** What shows up in the tooltip */
    tooltip: React.ReactNode;
    /** CSS for the wrapper `<div>` around input + tooltip */
    wrapperStyle?: React.CSSProperties;
    /** CSS for the `<input>` itself */
    inputStyle?: React.CSSProperties;
}

const InputWithTooltip = React.forwardRef<
    HTMLInputElement,
    InputWithTooltipProps
>(({ tooltip, wrapperStyle, inputStyle, ...inputProps }, ref) => {
    return (
        <Tooltip>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    ...wrapperStyle,
                }}
            >
                <input
                    ref={ref}
                    {...inputProps}
                    style={{
                        flex: 1,
                        padding: 8,
                        fontSize: "1rem",
                        borderRadius: 4,
                        border: "1px solid #ccc",
                        ...inputStyle,
                    }}
                />
                <span>{tooltip}</span>
            </div>
        </Tooltip>
    );
});

InputWithTooltip.displayName = "InputWithTooltip";

export default InputWithTooltip;
