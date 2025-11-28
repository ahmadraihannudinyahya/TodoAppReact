import { GlassCard } from "./GlassCard"
import { HorizontalProgress } from "./HorizontalProgress"

export const ProjectItem = ({
    project, 
    onClick,
}) => {
    return (
        <GlassCard
            onClick={onClick}
        >
            <div className='flex flex-col gap-2'>
                <h3 className="text-xl font-semibold text-theme-onsurface">{project.name}</h3>
                <p className="text-lg font-light text-theme-onsurface mb-4">{project.description}</p>
                <HorizontalProgress
                    progress={project.progress}
                />
            </div>
        </GlassCard>
    )
}