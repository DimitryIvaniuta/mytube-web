import * as React from "react";

interface LimitedInputWithWarningProps {
    /** Maximum allowed length before showing a warning */
    maxLength?: number;
}

const LimitedInputWithWarning: React.FC<LimitedInputWithWarningProps> = ({
                                                                             maxLength = 5,
                                                                         }) => {
    const [value, setValue] = React.useState("");
    const inputRef = React.useRef<HTMLInputElement>(null);

    const showWarning = value.length > maxLength;

    return (
        <div
            style={{
                position: "relative",
                display: "inline-block",
                overflow: "visible",           // <- allow tooltip to escape
            }}
        >
            {/* The input */}
            <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={`Type up to ${maxLength} chars`}
                aria-invalid={showWarning}
                style={{
                    padding: "8px 12px",
                    fontSize: "1rem",
                    borderRadius: 4,
                    border: showWarning ? "1px solid #e06c75" : "1px solid #ccc",
                    outline: "none",
                }}
            />

            {/* Tooltip, shown above the input */}
            {showWarning && (
                <div
                    role="alert"
                    style={{
                        position: "absolute",
                        bottom: "100%",           // place *above* the input
                        left: 0,
                        marginBottom: 8,          // gap between input and tooltip
                        zIndex: 10,
                    }}
                >
                    {/* Tooltip box */}
                    <div
                        style={{
                            position: "relative",
                            backgroundColor: "#5e9eff",
                            color: "#fff",
                            padding: "8px 12px",
                            borderRadius: 4,
                            fontSize: "0.875rem",
                            whiteSpace: "nowrap",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                        }}
                    >
                        ⚠️ Maximum {maxLength} characters allowed

                        {/* Arrow pointing down to the input */}
                        <div
                            style={{
                                position: "absolute",
                                top: "100%",          // at the bottom edge of the tooltip
                                left: 16,             // horizontally align the arrow
                                width: 0,
                                height: 0,
                                borderLeft: "6px solid transparent",
                                borderRight: "6px solid transparent",
                                borderTop: "6px solid #0070f3",  // triangle pointing down
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default LimitedInputWithWarning;
