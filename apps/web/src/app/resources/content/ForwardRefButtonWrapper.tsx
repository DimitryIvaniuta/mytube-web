import React, { useRef } from "react";
import ForwardRefButton, { ForwardRefButtonHandle } from "./ForwardRefButton";

type ForwardRefButtonWrapperProps = { name: string };

const ForwardRefButtonWrapper: React.FC<ForwardRefButtonWrapperProps> = ({ name }) => {
    const forwardRef = useRef<ForwardRefButtonHandle>(null);
    const handleClick = () => {
        forwardRef.current?.setName("Now I'm renamed!");
        forwardRef.current?.focus();
    };
    return (
        <div style={{padding: 20}}>
            <ForwardRefButton ref={forwardRef} initialLabel="Click me!"/>
            <div style={{marginTop: 12}}>
                <button onClick={handleClick}>
                    Rename & Focus the {name}
                </button>
            </div>
        </div>
    )
}
export default ForwardRefButtonWrapper;