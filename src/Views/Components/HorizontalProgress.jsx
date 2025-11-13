export const HorizontalProgress = ({ progress = 0, height = 8, label }) => {
  return (
    <div className="w-full flex flex-col">

      {label && (
        <span className="text-sm font-medium text-theme-onsurface mb-1">
          {label}
        </span>
      )}


      <div
        className="w-full bg-white/20 dark:bg-slate-700 rounded-full overflow-hidden"
        style={{ height }}
      >

        <div
          className="bg-[#B13BFF] h-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <span className="text-xs text-theme-onsurface w-full text-right mt-3">{Math.round(progress)}%</span>
    </div>
  )
}
