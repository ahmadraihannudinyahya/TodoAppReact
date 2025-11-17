export const GlassCard = ({ 
  children, 
  onClick, 
  className = '', 
}) => {
  return (
    <div
      className={`surface ${onClick ? 'onClick' : ''}  transition ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}