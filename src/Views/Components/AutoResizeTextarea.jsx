import { useRef, useEffect } from "react";

export const AutoResizeTextarea = ({
  value,
  onChange,
  minRows = 1,
  className = "",
  ...props
}) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; 
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      rows={minRows}
      className={`resize-none overflow-hidden ${className}`}
      onInput={(e) => {
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
      }}
      {...props}
    />
  );
};
