import { useEffect, useState } from "react"
import { HomeScreen } from "../Pages/HomeScreen"
import {
    getTasksByPriority,
    getProjects as idbGetProjects,
} from "../../infrastructure/repositories/idb"

export const HomePresenter = () => {
    const [projects, setProjects] = useState()
    const [tasks, setTasks] = useState()

    const loadData = async () => {
        const projects = await idbGetProjects()
        const tasks = await getTasksByPriority('high')
        setProjects(projects)
        setTasks(tasks)
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <HomeScreen
            projectList={projects}
            taskList={tasks}
        />
    )
}