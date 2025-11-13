import { useState } from "react"
import { DatePicker } from "./DatePicker"
import { PriorityCircle } from "./PriorityCircle"
import { AutoResizeTextarea } from "./AutoResizeTextarea"

export const TaskDetail = () => {
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [timeValue, setTimeValue] = useState("00:00");

    const handleTimeChange = (e) => {
        const time = e.target.value;
        setTimeValue(time);
    };
    return (
        <div
            className="flex flex-col gap-2"
        >
            <h3 className="text-xl font-bold mb-4 text-theme-onsurface">Task</h3>
            <input
                className={`text-lg font-bold text-theme-onsurface p-2 rounded-xl border-2 border-[#B13BFF]/50 w-full transition duration-600 ease-in-out`}
                value={"Task List"}
            />
            <div className="flex flex-row justify-between w-full gap-2">
                <h3 className="text-xl font-bold mb-4 text-theme-onsurface me-5">Due</h3>
                <div className="flex flex-row gap-2">
                    <h3
                        className="text-medium font-bold mb-4 text-theme-onsurface"
                        onClick={() => setShowDatePicker(!showDatePicker)}
                    >30 - November - 2025</h3>
                    <label className="text-lg font-semibold text-theme-onsurface">
                        <input type="time" value={timeValue} onChange={handleTimeChange} />
                    </label>
                </div>
            </div>
            {showDatePicker &&
                <DatePicker />

            }


            <div className="flex flex-row justify-between w-full gap-2">
                <h3 className="text-xl font-bold mb-4 text-theme-onsurface">Priority</h3>
                <div className="flex flex-row gap-2">
                    <PriorityCircle
                        priority={'low'}
                        selected= {true}
                    />
                    <PriorityCircle
                        priority={'medium'}
                    />
                    <PriorityCircle
                        priority={'high'}
                    />
                </div>
            </div>
            <h3 className="text-xl font-bold mb-4 text-theme-onsurface">Descriptions</h3>
            <AutoResizeTextarea
                className={`text-medium font-medium text-theme-onsurface p-2 rounded-xl border-2 border-[#B13BFF]/50 w-full transition duration-600 ease-in-out`}
                value={'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae voluptas, nobis, saepe magni omnis asperiores maiores, obcaecati vitae minima impedit excepturi architecto quis aliquam nulla doloremque quam provident voluptatum totam?'}
            />
            <div className="flex flex-row justify-center w-full">
                <button
                    aria-label="save"
                    className="p-2 rounded-full bg-green-500 hover:scale-105 transition-transform duration-200"

                >
                    Save
                </button>

            </div>
        </div>
    )
}