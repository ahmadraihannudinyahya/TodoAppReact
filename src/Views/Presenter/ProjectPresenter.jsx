import { useCallback, useEffect, useState } from "react"
import { ProjectScreen } from "../Pages/ProjectScreen"
import {
    getProject as idbGetProject,
    addProject, deleteProject as idbDeleteProject,
    updateProject as idbUpdateProject,
    addTask as idbAddTask,
    getTasksByProject,
    updateTask,
    deleteTask as idbDeleteTask,
    toogleTaskDone as idbToogleTaskDone,
} from "../../infrastructure/repositories/idb";
import { useNavigate, useParams } from "react-router-dom";

export const ProjectPresenter = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [lastDue, setLastDue] = useState('');
    const [progress, setProgress] = useState(0)

    const loadTask = useCallback(async (id) => {
        const tasks = await getTasksByProject(id);
        setTasks(tasks);
        if (tasks.length > 0) {
            const sorted = [...tasks].sort((a, b) => new Date(b.due) - new Date(a.due));
            const lastTask = sorted[0];
            setLastDue(new Date(lastTask.due).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            }));
            const taskDone = [...tasks].filter(task => task.isDone);
            const progress = taskDone.length / tasks.length * 100
            setProgress(progress)
        } else {
            setLastDue('-');
            setProgress(0)
        }
    }, [setTasks])

    const loadData = useCallback(async (id) => {
        const project = await idbGetProject(id);
        setProject(project);
        loadTask(id)
    }, [setProject, loadTask]);

    useEffect(() => {
        if (!id) {
            setProject(null)
            setTasks([])
        } else {
            loadData(id)
        }
    }, [id, loadData])


    const saveProject = async (projectPayload) => {
        if (project) {
            await idbUpdateProject(projectPayload)
        } else {
            setProject(projectPayload)
            await addProject(projectPayload)
        }
    }

    const deleteProject = async (project) => {
        await idbDeleteProject(project.id)
        setProject(null)
        navigate('/')
    }

    const saveTask = async (task) => {
        task.projectId = project.id;
        if (task.id) {
            await updateTask(task)
        } else {
            await idbAddTask(task)
        }
        loadTask(project.id)
    }

    const deleteTask = async (task) => {
        await idbDeleteTask(task.id)
        loadTask(project.id)
    }

    const toogleTaskDone = async (taskId) => {
        await idbToogleTaskDone(taskId)
        await loadTask(project.id)
    }

    return (
        <ProjectScreen
            project={project}
            lastDue={lastDue}
            progress={progress}
            onProjectSave={project => {
                saveProject(project)
            }}
            onProjectDelete={project => {
                deleteProject(project)
            }}
            onSaveTask={task => {
                saveTask(task)
            }}
            onDeleteTask={task => {
                deleteTask(task)
            }}
            tasks={tasks}
            toogleTaskDone={toogleTaskDone}
        />
    )
}