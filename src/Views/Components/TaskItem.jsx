import { useState } from "react"
import { CheckCircle } from "./CheckCircle"
import { GlassCard } from "./GlassCard"
import { PriorityCircle } from "./PriorityCircle"

export const TaskItem = ({
    onClick, 
}) => {
    const [isDone, setIsDone] = useState(false)
    return (
        <GlassCard
            onClick={onClick}
        >
            <div className='flex flex-row items-center'>
                <div
                onClick={() => {
                    setIsDone(!isDone)
                }}
                className='flex flex-col p-2'>
                    <CheckCircle status={isDone} />
                </div>
                <div className='flex pl-3 flex-row justify-between w-full'>
                    <div className='flex flex-col'>
                        <h3 className={`text-xl font-semibold text-theme-onsurface ${isDone ? 'line-through': ''}`}>Task In Progress</h3>
                        <p className={`text-lg font-light text-theme-onsurface ${isDone ? 'line-through': ''}`}>20 - Oktober - 2025</p>

                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <PriorityCircle />
                    </div>
                </div>
            </div>
        </GlassCard>
    )
}