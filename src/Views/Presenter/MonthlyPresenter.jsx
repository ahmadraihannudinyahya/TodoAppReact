import { useEffect, useState } from "react"
import { MonthlyScreen } from "../Pages/MonthlyScreen"
import { getTasksByDueDate } from "../../infrastructure/repositories/idb"

export const MonthlyPresenter = () => {
    const [date, setDate] = useState(new Date())
    const [tasks, setTasks] = useState([])

    const loadData = async (date) => {
        const tasks = await getTasksByDueDate(date)
        console.log(date, tasks);
        
        setTasks(tasks)
    }

    useEffect(() => {
        loadData(date)
    }, [date])

    return (
        <MonthlyScreen
            setDate={setDate}
            date={date}
            taskList={tasks}
        />
    )
}