import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { DatePicker } from '../Components/DatePicker';
import { TaskItem } from '../Components/TaskItem';
import { MasonryLayout } from '../Components/MasonryLayout';
import { GlassCard } from '../Components/GlassCard';
import { CircularProgress } from '../Components/CircularProgress';
import { useState } from 'react';
import { Modal } from '../Components/ModalOverlay';
import { TaskDetail } from '../Components/TaskDetail';

export const MonthlyScreen = ({
    taskList = [],
    setDate,
    date,
    progress = 0,
    toogleTaskDone = () => { }
}) => {
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const [task, setTask] = useState(null)
    return (
        <div className="flex flex-col gap-2 bg-center p-5 h-full">
            <div className='flex flex-row items-center'>
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition"
                    aria-label="Go Back"
                >
                    <ArrowLeftIcon className="w-6 h-6 text-theme-onbackground" />
                </button>
                <h1 className="text-2xl font-bold text-theme-onbackground ml-2">Activities</h1>
            </div>
            <MasonryLayout>
                <DatePicker value={date} onChange={setDate} />
                <GlassCard>
                    <div className="flex flex-row justify-between">
                        <div className='flex flex-col justify-center'>
                            <h3 className="text-xl font-semibold text-theme-onsurface">Activities</h3>
                            <p className="text-lg font-medium text-theme-onsurface">{taskList.length} Task</p>
                            <h4 className="text-sm font-light text-theme-onsurface tracking-wide">{date.toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric'
                            })}</h4>
                        </div>
                        <CircularProgress progress={progress} />
                    </div>
                </GlassCard>
                {taskList.map(task =>
                    <TaskItem
                        task={task}
                        toogleTaskDone={toogleTaskDone}
                        onClick={() => {
                            setTask(task)
                            setModalOpen(true)
                        }}
                    />
                )}
            </MasonryLayout>

            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <TaskDetail
                    task={task}
                />
            </Modal>
        </div>
    )
}