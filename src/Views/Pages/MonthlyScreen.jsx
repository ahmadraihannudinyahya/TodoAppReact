import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { DatePicker } from '../Components/DatePicker';
import { TaskItem } from '../Components/TaskItem';
import { MasonryLayout } from '../Components/MasonryLayout';

export const MonthlyScreen = () => {
    const navigate = useNavigate();
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
                <DatePicker />
                <TaskItem />
                <TaskItem />
                <TaskItem />
                <TaskItem />
                <TaskItem />
                <TaskItem />
                <TaskItem />
            </MasonryLayout>
        </div>
    )
}