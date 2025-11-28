import { useEffect, useState } from "react";
import { GlassCard } from "./GlassCard"
import { DocumentPlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { AutoResizeTextarea } from "./AutoResizeTextarea";
import { HorizontalProgress } from "./HorizontalProgress";

export const ProjectDetail = ({
    project = null,
    onProjectSave = () => { },
    onProjectDelete = () => { },
    onClickCreateTask = () => { },
    progress = 0, 
    lastDue = '-'
}) => {
    const [isEdit, setIsEdit] = useState(false)
    const [name, setName] = useState('')
    const [description, setdescription] = useState('')

    const resetState = () => {
        if (project) {
            setName(project.name)
            setdescription(project.description)
        } else {
            setName('')
            setdescription('')
        }
    }

    useEffect(() => {
        if (!project) {
            setIsEdit(true)
        } else {
            setName(project.name)
            setdescription(project.description)
            setIsEdit(false)
        }
    }, [project])
    return (
        <GlassCard>
            <div className="flex flex-col gap-2">
                <AutoResizeTextarea
                    className={`text-2xl font-bold text-theme-onsurface p-2 rounded-xl ${isEdit ? 'border-2 border-[#B13BFF]/50' : ''} transition duration-600 ease-in-out`}
                    value={name}
                    onChange={e => {
                        setName(e.target.value)
                    }}
                    placeholder="Project Name"
                    disabled={!isEdit}
                />
                <div className="flex flex-row justify-between w-full">
                    <p className="text-medium font-medium text-theme-onsurface">
                        Due Date
                    </p>
                    <p className="text-medium font-medium text-theme-onsurface">
                        {lastDue}
                    </p>
                </div>
                <h3
                    className="text-bold font-medium text-theme-onsurface"
                >description</h3>
                <AutoResizeTextarea
                    className={`text-medium font-medium text-theme-onsurface p-2 rounded-xl mb-4 ${isEdit ? 'border-2 border-[#B13BFF]/50' : ''} transition duration-600 ease-in-out`}
                    disabled={!isEdit}
                    value={description}
                    onChange={e => {
                        setdescription(e.target.value)
                    }}
                    placeholder="Project description"
                />
                <HorizontalProgress
                    progress={progress}
                />
                <div className="flex flex-row justify-end w-full">
                    {isEdit ? (
                        <div className="flex flex-row justify-center gap-4 w-full transition-all duration-600 ease-in-out opacity-100">
                            <button
                                aria-label="save"
                                className="p-2 rounded-full bg-green-500 hover:scale-105 transition-transform duration-200"
                                onClick={() => {
                                    onProjectSave({
                                        id: project?.id,
                                        name: name,
                                        description: description
                                    })
                                    setIsEdit(false)
                                }}
                            >
                                Save
                            </button>

                            <button
                                aria-label="cancel"
                                className="p-2 rounded-full bg-red-500 hover:scale-105 transition-transform duration-200"
                                onClick={() => {
                                    setIsEdit(false)
                                    resetState()
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-row justify-end gap-4 w-full transition-all duration-600 ease-in-out opacity-100">
                            <button
                                aria-label="edit"
                                className="p-2 rounded-full bg-green-500 onClick"
                                onClick={() => setIsEdit(true)}
                            >
                                <PencilIcon className="w-6 h-6 text-theme-onsurface" />
                            </button>

                            {project &&
                                <>
                                    <button
                                        aria-label="create task"
                                        className="p-2 rounded-full bg-green-500 onClick"
                                        onClick={onClickCreateTask}
                                    >
                                        <DocumentPlusIcon className="w-6 h-6 text-theme-onsurface" />
                                    </button>
                                    <button
                                        aria-label="create task"
                                        className="p-2 rounded-full bg-red-500 onClick"
                                        onClick={() => onProjectDelete(project)}
                                    >
                                        <TrashIcon className="w-6 h-6 text-theme-onsurface" />
                                    </button>
                                </>
                            }

                        </div>
                    )}
                </div>
            </div>
        </GlassCard >
    )
}