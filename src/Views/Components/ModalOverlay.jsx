import { createPortal } from "react-dom";
import { GlassCard } from "./GlassCard";

export const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        createPortal(
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-[#F5F1DC]/70 dark:bg-slate-700/70"
                onClick={onClose}
            >
                <div
                    className="surface bg-[#F5F1DC] dark:bg-[#090040] hover:bg-[#F5F1DC] dark:hover:bg-[#090040] overflow-y-auto max-h-screen"
                    onClick={(e) => e.stopPropagation()}
                >
                    {children}
                </div>
            </div>,
            document.body
        )
    );
};