import React from "react";
import PresentationCard from "@/app/resources/content/PresentationCard";

const PresentationCardWrapper: React.FC = () => {
    return (
        <PresentationCard title={"Happy Birthday"} >
            <div>Congratulations</div>
        </PresentationCard>
    );
}
export default PresentationCardWrapper;