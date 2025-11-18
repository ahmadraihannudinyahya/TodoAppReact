import { CheckCircle } from "./CheckCircle"
import { GlassCard } from "./GlassCard"
import { PriorityCircle } from "./PriorityCircle"

export const TaskItem = ({
    task = null,
    onClick = () => { },
    toogleTaskDone = () => { },
}) => {
    return (
        <GlassCard
            onClick={onClick}
        >
            <div className='flex flex-row items-center'>
                <div
                    onClick={e => {
                        e.stopPropagation()
                        toogleTaskDone(task.id)
                    }}
                    className='flex flex-col p-2'>
                    <CheckCircle status={task.isDone} />
                </div>
                <div className='flex pl-3 flex-row justify-between w-full'>
                    <div className='flex flex-col'>
                        <h3 className={`text-xl font-semibold text-theme-onsurface ${task.isDone ? 'line-through' : ''}`}>{task?.name} </h3>
                        <p className={`text-lg font-light text-theme-onsurface ${task.isDone ? 'line-through' : ''}`}>{task ? new Date(task.due).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'
                        }) : '-'}</p>

                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <PriorityCircle priority={task.priority} />
                    </div>
                </div>
            </div>
        </GlassCard>
    )
}