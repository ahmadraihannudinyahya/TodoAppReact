import { useState } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";

import { GlassCard } from "./GlassCard";

export const DatePicker = ({
    className = ''
}) => {

    // const [timeValue, setTimeValue] = useState("00:00");

    // const handleTimeChange = (e) => {
    //     const time = e.target.value;
    //     if (!selected) {
    //         setTimeValue(time);
    //         return;
    //     }
    //     const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
    //     const newSelectedDate = setHours(setMinutes(selected, minutes), hours);
    //     setSelected(newSelectedDate);
    //     setTimeValue(time);
    // };

    const [selected, setSelected] = useState();
    const defaultClassNames = getDefaultClassNames();

    return (
        <GlassCard
            className={className}
        >
            <div className={`flex flex-col items-center`}>
                {/* <label className="text-lg font-semibold text-theme-onsurface">
                    Select Time:{" "}
                    <input type="time" value={timeValue} onChange={handleTimeChange} />
                </label> */}
                <DayPicker
                    captionLayout="dropdown"
                    mode="single"
                    selected={selected}
                    onSelect={setSelected}
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