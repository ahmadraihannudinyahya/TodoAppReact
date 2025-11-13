import { useState } from "react";
import { GlassCard } from "./GlassCard"
import { DocumentPlusIcon, PencilIcon } from "@heroicons/react/24/outline";
import { AutoResizeTextarea } from "./AutoResizeTextarea";

export const ProjectDetail = () => {
    const [isEdit, setIsEdit] = useState(false)
    return (
        <GlassCard>
            <div className="flex flex-col gap-2">
                <input
                    className={`text-2xl font-bold text-theme-onsurface p-2 rounded-xl ${isEdit ? 'border-2 border-[#B13BFF]/50' : ''} transition duration-600 ease-in-out`}
                    value={"Todo List"}
                    disabled={!isEdit}
                />
                <div className="flex flex-row justify-between w-full">
                    <p className="text-medium font-medium text-theme-onsurface">
                        Due Date
                    </p>
                    <p className="text-medium font-medium text-theme-onsurface">
                        20 - Oktober - 2024
                    </p>
                </div>
                <h3
                    className="text-bold font-medium text-theme-onsurface"
                >Descriptions</h3>
                <AutoResizeTextarea
                    className={`text-medium font-medium text-theme-onsurface p-2 rounded-xl ${isEdit ? 'border-2 border-[#B13BFF]/50' : ''} transition duration-600 ease-in-out`}
                    disabled={!isEdit}
                    value={'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae voluptas, nobis, saepe magni omnis asperiores maiores, obcaecati vitae minima impedit excepturi architecto quis aliquam nulla doloremque quam provident voluptatum totam?'}
                />
                <div className="flex flex-row justify-end w-full">
                    {isEdit ? (
                        <div className="flex flex-row justify-center gap-4 w-full transition-all duration-600 ease-in-out opacity-100">
                            <button
                                aria-label="save"
                                className="p-2 rounded-full bg-green-500 hover:scale-105 transition-transform duration-200"
                                onClick={() => setIsEdit(false)}
                            >
                                Save
                            </button>

                            <button
                                aria-label="cancel"
                                className="p-2 rounded-full bg-red-500 hover:scale-105 transition-transform duration-200"
                                onClick={() => setIsEdit(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-row justify-end gap-4 w-full transition-all duration-600 ease-in-out opacity-100">
                            <button
                                aria-label="edit"
                                className="p-2 rounded-full bg-green-500 hover:scale-105 transition-transform duration-200"
                                onClick={() => setIsEdit(true)}
                            >
                                <PencilIcon className="w-6 h-6 text-theme-onsurface" />
                            </button>
                            <button
                                aria-label="create task"
                                className="p-2 rounded-full bg-green-500 hover:scale-105 transition-transform duration-200"
                                // onClick={() => setIsEdit(true)}
                            >
                                <DocumentPlusIcon className="w-6 h-6 text-theme-onsurface" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </GlassCard >
    )
}