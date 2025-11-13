import { GlassCard } from "./GlassCard"
import { HorizontalProgress } from "./HorizontalProgress"

export const ProjectItem = ({
    onClick,
}) => {
    return (
        <GlassCard
            onClick={onClick}
        >
            <div className='flex flex-col'>
                <h3 className="text-xl font-semibold text-theme-onsurface">Todo List</h3>
                <p className="text-lg font-light text-theme-onsurface">Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore nobis provident eveniet illum error est aliquid dolorum ipsum ducimus, praesentium voluptatem, excepturi omnis! Voluptatibus tempore, tenetur dolore ullam pariatur quasi!</p>
                <HorizontalProgress
                    progress={20}
                />
            </div>
        </GlassCard>
    )
}