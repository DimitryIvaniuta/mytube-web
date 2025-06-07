import React, {forwardRef, useLayoutEffect, useRef, useState} from "react";

type TooltipProps = {
    children: React.ReactNode;
}
const Tooltip:React.FC<TooltipProps> = ({ children }: TooltipProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    useLayoutEffect(() => {
        if (ref.current) {
            setWidth(ref.current.getBoundingClientRect().width);
        }
    }, []);

    return (
        <div ref={ref} style={{ width }}>
            {children}
        </div>
    );
}

export default forwardRef<HTMLDivElement, TooltipProps>(Tooltip);