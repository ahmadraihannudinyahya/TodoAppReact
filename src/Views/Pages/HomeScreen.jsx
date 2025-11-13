import { DailyActivities } from "../Components/DailyActivities"
import { GlassCard } from "../Components/GlassCard";
import { ProjectItem } from "../Components/ProjectItem"
import { TaskItem } from "../Components/TaskItem"
import { Cog6ToothIcon, DocumentPlusIcon } from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom';
import { MasonryLayout } from "../Components/MasonryLayout";
import { Modal } from "../Components/ModalOverlay";
import { useState } from "react";
import { TaskDetail } from "../Components/TaskDetail";
import { useAuth } from "react-oidc-context";

export const HomeScreen = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
    const auth = useAuth();

    return (
        <div className="flex flex-col gap-2 bg-center p-5">
            <MasonryLayout>
                <GlassCard>
                    <div className="flex flex-row items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-theme-onsurface">Hi {auth?.user?.profile?.name}</h1>
                            <p className="text-lg font-light text-theme-onsurface">Small Steps, Big Progress</p>
                        </div>
                        <button
                            aria-label="Settings"
                            className="p-2 rounded-full bg-white/20 dark:bg-slate-700 transition"
                            onClick={() => navigate('/settings')}
                        >
                            <Cog6ToothIcon className="w-6 h-6 text-theme-onsurface" />
                        </button>
                    </div>
                </GlassCard>
                <GlassCard
                    onClick={() => navigate('/project')}
                >
                    <div className="flex flex-row items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-theme-onsurface">Create New Project</h1>
                        </div>
                        <button
                            aria-label="Create"
                            className="p-2 rounded-full bg-green-500 transition"
                        >
                            <DocumentPlusIcon className="w-6 h-6 text-theme-onsurface" />
                        </button>
                    </div>
                </GlassCard>
                <DailyActivities
                    totalTask={20}
                    taskDone={14}
                    onClick={() => navigate('/monthly')}
                />
            </MasonryLayout>


            <h1 className="text-2xl font-bold text-theme-onbackground">Manage Projects</h1>
            <MasonryLayout>

                <ProjectItem
                    onClick={() => navigate('/project')}
                />
                <ProjectItem />
                <ProjectItem />
            </MasonryLayout>

            <h1 className="text-2xl font-bold text-theme-onbackground">High Priority Task</h1>
            <MasonryLayout>
                <TaskItem
                    onClick={() => setModalOpen(true)}
                />
                <TaskItem />
                <TaskItem />
                <TaskItem />
                <TaskItem />
                <TaskItem />
                <TaskItem />
            </MasonryLayout>

            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <TaskDetail />
            </Modal>
        </div>
    )
}