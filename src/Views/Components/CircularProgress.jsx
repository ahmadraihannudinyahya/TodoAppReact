export const CircularProgress = ({ progress = 0, size = 100, stroke = 10, label }) => {

    const radius = (size - stroke) / 2
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (progress / 100) * circumference

    return (
        <div className="flex flex-col items-center justify-center">
            <svg
                width={size}
                height={size}
                className="transform -rotate-90"
            >
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="rgba(177,59,255),0.15)"
                    strokeWidth={stroke}
                    fill="transparent"
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="url(#grad)"
                    strokeWidth={stroke}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="transition-all duration-700"
                />
                <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="10%" stopColor="#B13BFF" />
                        <stop offset="100%" stopColor="#B13BFF" />
                    </linearGradient>
                </defs>
            </svg>

            <div
                className="absolute flex flex-col items-center justify-center text-center"
                style={{ width: size, height: size }}
            >
                <span className="text-lg font-bold text-theme-onsurface drop-shadow-sm">
                    {progress}%
                </span>
                {label && <span className="text-xs text-theme-onsurface/80">{label}</span>}
            </div>
        </div>
    )
}