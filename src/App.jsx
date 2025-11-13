import './App.css'
import { HomeScreen } from './Views/Pages/HomeScreen'
import { MonthlyScreen } from './Views/Pages/MonthlyScreen'
import { ProjectScreen } from './Views/Pages/ProjectScreen';
import { Settings } from './Views/Pages/Settings'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <div className="min-h-screen bg-fixed bg-cover bg-center
                    bg-[url('/assets/images/bg_light.png')] 
                    dark:bg-[url('/assets/images/bg_dark.png')] backdrop-blur-sm">
            <div className="min-h-screen overflow-y-auto backdrop-blur-sm">
                <Router>
                    <Routes>
                        <Route
                            path="/"
                            element={<HomeScreen />}
                        />
                        <Route
                            path="/monthly"
                            element={<MonthlyScreen />}
                        />
                        <Route
                            path="/settings"
                            element={<Settings />}
                        />
                        <Route
                            path="/project"
                            element={<ProjectScreen />}
                        />
                    </Routes>
                </Router>
            </div>
        </div >
    )
}

export default App
