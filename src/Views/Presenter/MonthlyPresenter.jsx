import { useEffect, useState } from "react"
import { MonthlyScreen } from "../Pages/MonthlyScreen"
import {
    getTasksByDueDate,
    toogleTaskDone as idbToogleTaskDone,
} from "../../infrastructure/repositories/idb"

export const MonthlyPresenter = () => {
    const [date, setDate] = useState(new Date())
    const [tasks, setTasks] = useState([])
    const [progress, setProgress] = useState(0)

    const loadData = async (date) => {
        const tasks = await getTasksByDueDate(date)
        setTasks(tasks)
        if (tasks.length > 0) {
            const taskDone = [...tasks].filter(task => task.isDone);
            const progress = taskDone.length / tasks.length * 100
            setProgress(progress)
        } else {
            setProgress(0)
        }
    }

    const toogleTaskDone = async (taskId) => {
        await idbToogleTaskDone(taskId)
        await loadData(date)
    }

    useEffect(() => {
        loadData(date)
    }, [date])

    return (
        <MonthlyScreen
            setDate={setDate}
            date={date}
            taskList={tasks}
            progress={progress}
            toogleTaskDone={toogleTaskDone}
        />
    )
}