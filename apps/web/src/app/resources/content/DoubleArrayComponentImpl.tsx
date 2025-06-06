import React, { useState, ChangeEvent, useMemo } from "react";
import { InputImproved, InputImprovedProps } from "@frontend/shared-data";

// Import the shared Input and its props type. Adjust the import path
// if your monorepo uses a custom path alias (e.g., "@mytube-web/input").

import PresentationCard from "./PresentationCard";

/**
 * Props for DoubleArrayComponent:
 * - `initialNumbers`: The array of numbers to start with (will be doubled).
 */
export interface DoubleArrayComponentProps {
    initialNumbers: number[];
}

/**
 * DoubleArrayComponent:
 * - Accepts an `initialNumbers` prop (e.g. [1,2])
 * - Renders an input for the user to override/edit the comma-separated list.
 * - Parses the string into a number[] and doubles it.
 * - Displays the final doubled array.
 */
const DoubleArrayComponentImpl: React.FC<DoubleArrayComponentProps> = ({
                                                                       initialNumbers,
                                                                   }) => {
    // Convert the initialNumbers array to a comma‐separated string (e.g. "1,2,3")
    const initialString = useMemo(
        () => initialNumbers.join(","),
        [initialNumbers]
    );

    // Controlled input state: user can type "4,5,6" or leave as "1,2".
    const [inputValue, setInputValue] = useState<string>(initialString);

    // Whenever the input changes, update state:
    const handleInputChange: InputImprovedProps["onChange"] = (e) => {
        setInputValue(e.target.value);
    };

    /**
     * Parse a comma‐separated string into a number[].
     * - Splits on commas, trims whitespace, filters non‐numeric entries.
     */
    const parseArray = (val: string): number[] => {
        return val
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s !== "")
            .map((s) => Number(s))
            .filter((n) => !isNaN(n));
    };

    // Compute the current number array from inputValue
    const parsedNumbers = useMemo(() => parseArray(inputValue), [inputValue]);

    // Create the doubled array (e.g. [1,2] → [1,2,1,2])
    const doubledArray = useMemo(() => [...parsedNumbers, ...parsedNumbers], [
        parsedNumbers,
    ]);

    return (
        <PresentationCard title="Double Array Demo">
            <p style={{ marginBottom: 12, color: "#555" }}>
                Start with numbers: <code>{initialString}</code>. You can edit the list below:
            </p>

            <label
                htmlFor="double-array-input"
                style={{ display: "block", marginBottom: 8, fontWeight: 500 }}
            >
                Enter comma‐separated numbers:
            </label>

            <InputImproved
                value={inputValue}
                onChange={handleInputChange}
                placeholder="e.g. 2,4,6"
                className="double-array-input"
            />

            <div style={{ marginTop: 20, fontSize: "1rem", color: "#333" }}>
                <strong>Doubled Array:</strong>{" "}
                <code style={{ background: "#f5f5f5", padding: "2px 4px", borderRadius: 4 }}>
                    {JSON.stringify(doubledArray)}
                </code>
            </div>
        </PresentationCard>
    );
};

export default DoubleArrayComponentImpl;
