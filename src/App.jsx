import { useEffect } from 'react';
import './App.css'
import { HomeScreen } from './Views/Pages/HomeScreen'
import { MonthlyScreen } from './Views/Pages/MonthlyScreen'
import { Settings } from './Views/Pages/Settings'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { initDB } from './infrastructure/indexedDb/config';
import { ProjectPresenter } from './Views/Presenter/ProjectPresenter';
import { HomePresenter } from './Views/Presenter/HomePresenter';
import { MonthlyPresenter } from './Views/Presenter/MonthlyPresenter';

function App() {
    useEffect(() => {
        const load = async () => {
            await initDB();
        };

        load();
    }, []);
    return (
        <div className="min-h-screen bg-fixed bg-cover bg-center
                    bg-[url('/assets/images/bg_light.png')] 
                    dark:bg-[url('/assets/images/bg_dark.png')] backdrop-blur-sm">
            <div className="min-h-screen overflow-y-auto backdrop-blur-sm">
                <Router>
                    <Routes>
                        <Route
                            path="/"
                            element={<HomePresenter />}
                        />
                        <Route
                            path="/monthly"
                            element={<MonthlyPresenter />}
                        />
                        <Route
                            path="/settings"
                            element={<Settings />}
                        />
                         <Route
                            path="/project/"
                            element={<ProjectPresenter />}
                        />
                        <Route
                            path="/project/:id"
                            element={<ProjectPresenter />}
                        />
                    </Routes>
                </Router>
            </div>
        </div >
    )
}

export default App
