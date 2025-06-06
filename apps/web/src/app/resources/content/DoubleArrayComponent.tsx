import React, { useState, ChangeEvent } from "react";
import {Input} from "@frontend/shared-data";

const DoubleArrayComponent: React.FC = () => {
    // Initial value "1,2" represents the array [1, 2]
    const [inputValue, setInputValue] = useState<string>("1,2");

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    // Parse the comma-separated string into a number[].
    const parseArray = (val: string): number[] => {
        return val
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item !== "")
            .map(Number)
            .filter((num) => !isNaN(num));
    };

    const inputArray = parseArray(inputValue);
    const doubledArray = [...inputArray, ...inputArray];

    return (
        <div>
            <label>
                Enter Your numbers (comma-separated):
                <Input value={inputValue} onChange={handleInputChange} />
            </label>

            <div style={{ marginTop: "12px" }}>
                Doubled Array: {JSON.stringify(doubledArray)}
            </div>
        </div>
    );
};

export default DoubleArrayComponent;