export const GlassCard = ({ 
  children, 
  onClick, 
  className = '', 
}) => {
  return (
    <div
      className={`surface ${onClick ? 'hover:bg-gray-400 dark:hover:bg-slate-700' : ''}  transition ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}