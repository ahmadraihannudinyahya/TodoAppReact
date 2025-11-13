import { CircularProgress } from "./CircularProgress"
import { GlassCard } from "./GlassCard"

export const DailyActivities = ({
    totalTask = 0,
    taskDone = 0,
    onClick,
}) => {
    const progress = totalTask === 0 ? 0 : (taskDone / totalTask) * 100;

    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('default', { month: 'long' }); // nama bulan penuh
    const year = today.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;
    return (
        <GlassCard
            onClick={onClick}
        >
            <div className="flex flex-row justify-between">
                <div className='flex flex-col justify-center'>
                    <h3 className="text-xl font-semibold text-theme-onsurface">Daily Activities</h3>
                    <p className="text-lg font-medium text-theme-onsurface">{taskDone} / {totalTask} Task Done</p>
                    <h4 className="text-sm font-light text-theme-onsurface tracking-wide">{formattedDate}</h4>
                </div>
                <CircularProgress progress={progress} />
            </div>
        </GlassCard>
    )
}