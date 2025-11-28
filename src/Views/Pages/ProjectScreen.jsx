import { useNavigate } from 'react-router-dom';
import { TaskItem } from '../Components/TaskItem';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { ProjectDetail } from '../Components/ProjectDetail';
import { MasonryLayout } from '../Components/MasonryLayout';
import { useState } from 'react';
import { Modal } from '../Components/ModalOverlay';
import { TaskDetail } from '../Components/TaskDetail';

export const ProjectScreen = ({
    project = null,
    tasks = [],
    progress = 0,
    lastDue = '-',
    onProjectSave = () => { },
    onProjectDelete = () => { },
    onSaveTask = () => { },
    onDeleteTask = () => { },
    toogleTaskDone = () => { },
}) => {
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const [task, setTask] = useState(null)
    return (
        <div className="flex flex-col gap-2 bg-center p-5">
            <div className='flex flex-row items-center'>
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-full onClick"
                    aria-label="Go Back"
                >
                    <ArrowLeftIcon className="w-6 h-6 text-theme-onbackground" />
                </button>
                <h1 className="text-2xl font-bold text-theme-onbackground ml-2">Project</h1>
            </div>
            <MasonryLayout>
                <ProjectDetail
                    project={project}
                    onProjectSave={onProjectSave}
                    onProjectDelete={onProjectDelete}
                    onClickCreateTask={() => setModalOpen(true)}
                    progress={progress}
                    lastDue={lastDue}
                />
                {
                    tasks.map(task =>
                        <TaskItem
                            task={task}
                            onClick={() => {
                                setTask(task)
                                setModalOpen(true)
                            }}
                            toogleTaskDone={toogleTaskDone}
                        />
                    )
                }
            </MasonryLayout>
            <Modal isOpen={isModalOpen} onClose={() => {
                setModalOpen(false)
                setTask(null)
            }}>
                <TaskDetail
                    task={task}
                    onSaveTask={(task) => {
                        onSaveTask(task)
                        setModalOpen(false)
                    }}
                    onDeleteTask={(task) => {
                        onDeleteTask(task)
                        setTask(null)
                        setModalOpen(false)
                    }}
                />
            </Modal>
        </div>

    )
}