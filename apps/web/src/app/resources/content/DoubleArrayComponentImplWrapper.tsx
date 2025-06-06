import React from "react";
import DoubleArrayComponentImpl from "@/app/resources/content/DoubleArrayComponentImpl";

const DoubleArrayComponentImplWrapper: React.FC = () => {
    return (
        <DoubleArrayComponentImpl initialNumbers={[1,2,3]} />
    )
}

export default DoubleArrayComponentImplWrapper;