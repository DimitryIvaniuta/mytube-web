import * as React from "react";

export interface ForwardRefButtonHandle {
    focus(): void;
    setName(name: string): void;
}

export interface ForwardRefButtonProps {
    initialLabel: string;
}

const ForwardRefButton = React.forwardRef<ForwardRefButtonHandle, ForwardRefButtonProps>(
    ({ initialLabel }, ref) => {
        // Internal state for the label
        const [label, setLabel] = React.useState(initialLabel);
        // Ref to the underlying <button>
        const buttonRef = React.useRef<HTMLButtonElement>(null);

        // Expose focus() and setName() on the forwarded ref
        React.useImperativeHandle(ref, () => ({
            focus: () => {
                buttonRef.current?.focus();
            },
            setName: (name: string) => {
                setLabel(name);
            },
        }), []);

        return (
            <button ref={buttonRef}>
                {label}
            </button>
        );
    }
);
ForwardRefButton.displayName = "ForwardRefButton";

export default ForwardRefButton;
