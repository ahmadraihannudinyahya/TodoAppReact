import { useCallback, useEffect, useState } from "react"
import { HomeScreen } from "../Pages/HomeScreen"
import {
    getTasksByPriority,
    getProjects as idbGetProjects,
    getTasksByProject,
    toogleTaskDone as idbToogleTaskDone, 
    getTasksByDueDate
} from "../../infrastructure/repositories/idb"

export const HomePresenter = () => {
    const [projects, setProjects] = useState()
    const [tasks, setTasks] = useState()
    const [dailyTask, setDailyTask] = useState([])

    const getProjects = async () => {
        const projects = await idbGetProjects()
        const tasksProjects = await Promise.all(projects.map(async (project) => {
            return await getTasksByProject(project.id)
        }))
        return projects.map(project => {
            const projectTask = tasksProjects.flat().filter(task => task.projectId === project.id);
            const projectTaskDone = projectTask.filter(task => task.isDone);
            return {
                ...project,
                progress: projectTaskDone.length / projectTask.length * 100,
            }
        })
    }

    const loadData = useCallback(async () => {
        const projects = await getProjects();
        const tasks = await getTasksByPriority('high')
        const dailyTasks = await getTasksByDueDate(new Date())
        setDailyTask(dailyTasks)
        setProjects(projects)
        setTasks(tasks)
    }, [])

    const toogleTaskDone = async (taskId) => {
        await idbToogleTaskDone(taskId)
        loadData()
    }

    useEffect(() => {
        loadData()
    }, [loadData])

    return (
        <HomeScreen
            projectList={projects}
            taskList={tasks}
            toogleTaskDone = {toogleTaskDone}
            dailyTask={dailyTask.length}
            dailyTaskDone={dailyTask.filter(task => task.isDone).length}
        />
    )
}