import { useState } from "react"
import { CheckCircle } from "./CheckCircle"
import { GlassCard } from "./GlassCard"
import { PriorityCircle } from "./PriorityCircle"

export const TaskItem = ({
    task = null,
    onClick,
}) => {
    const [isDone, setIsDone] = useState(false)
    return (
        <GlassCard
            onClick={onClick}
        >
            <div className='flex flex-row items-center'>
                <div
                    onClick={ e => {
                        e.stopPropagation()
                        setIsDone(!isDone)
                    }}
                    className='flex flex-col p-2'>
                    <CheckCircle status={isDone} />
                </div>
                <div className='flex pl-3 flex-row justify-between w-full'>
                    <div className='flex flex-col'>
                        <h3 className={`text-xl font-semibold text-theme-onsurface ${isDone ? 'line-through' : ''}`}>{task?.name} </h3>
                        <p className={`text-lg font-light text-theme-onsurface ${isDone ? 'line-through' : ''}`}>{task ? new Date(task.due).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'
                        }): '-'}</p>

                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <PriorityCircle  priority={task.priority}/>
                    </div>
                </div>
            </div>
        </GlassCard>
    )
}