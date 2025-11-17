import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";

import { GlassCard } from "./GlassCard";

export const DatePicker = ({
    className = '', 
    onChange, 
    value, 
}) => {
    const defaultClassNames = getDefaultClassNames();
    return (
        <GlassCard
            className={className}
        >
            <div className={`flex flex-col items-center`}>
                <DayPicker
                    captionLayout="dropdown"
                    mode="single"
                    selected={value}
                    onSelect={onChange}
                    showOutsideDays={true}
                    modifiersClassNames={{
                        selected: "bg-[#B13BFF] text-white rounded-full",
                        today: "text-[#B13BFF] font-bold",
                    }}
                    classNames={{
                        root: `${defaultClassNames.root} text-theme-onsurface`,
                        months: "flex flex-col",
                        caption_label: "text-theme-onsurface font-semibold",
                        nav_button_previous: "text-theme-onsurface",
                        nav_button_next: "text-theme-onsurface",
                        chevron: `text-theme-onsurface fill-black dark:fill-white`,
                    }}
                />
            </div>
        </GlassCard>
    );
}