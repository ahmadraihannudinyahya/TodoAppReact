import { DatePicker } from "./DatePicker"
import { PriorityCircle } from "./PriorityCircle"
import { AutoResizeTextarea } from "./AutoResizeTextarea"
import { useEffect, useState } from "react"

export const TaskDetail = ({
    task = null,
    onSaveTask = null,
    onDeleteTask = null,
}) => {
    const [name, setName] = useState('')
    const [descriptions, setDescriptions] = useState('')
    const [dueDate, setDueDate] = useState(new Date())
    const [timeValue, setTimeValue] = useState("00:00")
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [priority, setPriority] = useState('low')

    useEffect(() => {
        if (task) {

            const taskDate = new Date(task.due)
            const hours = taskDate.getHours().toString().padStart(2, '0')
            const minutes = taskDate.getMinutes().toString().padStart(2, '0')
            setName(task.name)
            setDescriptions(task.descriptions)
            setDueDate(taskDate)
            setTimeValue(`${hours}:${minutes}`)
            setPriority(task.priority)
        } else {
            setName('')
            setDescriptions('')
            setDueDate(new Date())
            setTimeValue("00:00")
            setPriority('low')
        }
    }, [task])

    const handleTimeChange = (e) => setTimeValue(e.target.value)
    const handlePrioritySelect = (level) => {
        if (onSaveTask != null)
            setPriority(level)
    }

    return (
        <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold mb-4 text-theme-onsurface">Task</h3>

            <AutoResizeTextarea
                className="text-lg font-bold text-theme-onsurface p-2 rounded-xl border-2 border-[#B13BFF]/50 w-full transition duration-600 ease-in-out"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Task"
                disabled={onSaveTask == null}
            />

            <div className="flex flex-row justify-between w-full gap-2 items-center">
                <h3 className="text-xl font-bold mb-4 text-theme-onsurface me-5">Due</h3>
                <div className="flex flex-row gap-2 items-center">
                    <h3
                        className="text-medium font-bold mb-4 text-theme-onsurface cursor-pointer"
                        onClick={() => {
                            if (onSaveTask != null)
                                setShowDatePicker(!showDatePicker)
                        }}
                    >
                        {dueDate.toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'
                        })}
                    </h3>
                    <label className="text-lg font-semibold text-theme-onsurface">
                        <input
                            type="time"
                            value={timeValue}
                            onChange={handleTimeChange}
                            disabled={onSaveTask == null}
                        />
                    </label>
                </div>
            </div>

            {showDatePicker && <DatePicker value={dueDate} onChange={setDueDate} />}

            <div className="flex flex-row justify-between w-full gap-2">
                <h3 className="text-xl font-bold mb-4 text-theme-onsurface">Priority</h3>
                <div className="flex flex-row gap-2">
                    {['low', 'medium', 'high'].map(level => (
                        <PriorityCircle
                            key={level}
                            priority={level}
                            selected={priority === level}
                            onClick={() => handlePrioritySelect(level)}
                        />
                    ))}
                </div>
            </div>

            <h3 className="text-xl font-bold mb-4 text-theme-onsurface">Descriptions</h3>
            <AutoResizeTextarea
                className="text-medium font-medium text-theme-onsurface p-2 rounded-xl border-2 border-[#B13BFF]/50 w-full transition duration-600 ease-in-out"
                value={descriptions}
                onChange={e => setDescriptions(e.target.value)}
                placeholder="Task Descriptions"
                disabled={onSaveTask == null}
            />

            <div className="flex flex-row justify-center w-full gap-2">
                {onSaveTask && <button
                    aria-label="save"
                    className="p-2 rounded-full bg-green-500 onClick"
                    onClick={() => {
                        // Combine date + time into ISO string
                        const dueISO = new Date(
                            dueDate.getFullYear(),
                            dueDate.getMonth(),
                            dueDate.getDate(),
                            parseInt(timeValue.split(':')[0]),
                            parseInt(timeValue.split(':')[1])
                        ).toISOString()

                        onSaveTask({
                            id: task?.id,
                            name,
                            descriptions,
                            due: dueISO,
                            priority
                        })
                    }}
                >
                    Save
                </button>}
                {onDeleteTask && <button
                    aria-label="Delete"
                    className="p-2 rounded-full bg-red-500 onClick"
                    onClick={() => {
                        onDeleteTask(task)
                    }}
                >
                    Delete
                </button>}
            </div>

        </div>
    )
}
