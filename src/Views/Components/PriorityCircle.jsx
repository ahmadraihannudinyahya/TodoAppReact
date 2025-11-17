export const PriorityCircle = ({
    priority = 'low', 
    size = 24, 
    selected = false, 
    onClick = () => {}, 
}) => {
    let color = ''

    switch (priority.toLowerCase()) {
        case 'low':
            color = '#22c55e' // green-500
            break
        case 'medium':
            color = '#facc15' // yellow-400
            break
        default:
            color = '#ef4444' // red-500
            break
    }

    return (
        <div
            onClick = {onClick}
            className={`flex items-center justify-center rounded-full border-2 onClick`}
            style={{
                width: size,
                height: size,
                backgroundColor: selected ? color : 'transparent',
                borderColor: color,
            }}
        >
            {!selected && (
                <div
                    className="rounded-full"
                    style={{
                        width: size / 2,
                        height: size / 2,
                        backgroundColor: color,
                    }}
                />
            )}
        </div>
    )
}
