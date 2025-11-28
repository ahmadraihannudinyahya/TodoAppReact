import './App.css'
import { Settings } from './Views/Pages/Settings'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProjectPresenter } from './Views/Presenter/ProjectPresenter';
import { HomePresenter } from './Views/Presenter/HomePresenter';
import { MonthlyPresenter } from './Views/Presenter/MonthlyPresenter';
import { useEffect } from 'react';
import { useAuth } from 'react-oidc-context';


const sendTokenToSW = (token) => {
    const swController = navigator.serviceWorker.controller;
    if (swController) {
        swController.postMessage({
            type: 'SET_JWT_TOKEN',
            token: token
        });
    }
};

const sendSyncSW = () => {
    const swController = navigator.serviceWorker.controller;
    if (swController) {
        swController.postMessage({
            type: 'FORCE_SYNC',
        });
    }
};

function App() {
    const auth = useAuth();

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(reg => {
                    if (auth.isAuthenticated && 'PERIODIC_SYNC' in reg) {
                        reg.PERIODIC_SYNC.register('SYNC_PENDING_DATA', {
                            minInterval: 1000 * 60 * 60,  // 1 Hour
                        })
                    }
                })
                .catch(err => {
                    console.error("SW registration failed:", err);
                });
        }
    }, [])

    useEffect(() => {
        if (!('serviceWorker' in navigator)) return;

        if (auth.isAuthenticated && auth.user?.access_token) {
            sendTokenToSW(auth.user.access_token);
            sendSyncSW();
        }

        const handleSWMessage = (event) => {
            if (event.data && event.data.type === 'TOKEN_EXPIRED_REQUEST_REFRESH') {
                if (auth.isAuthenticated) {
                    auth.signinSilent({
                        resource: "api://default"
                    })
                        .then(user => {
                            sendTokenToSW(user.access_token);
                            // sendSyncSW();
                        })
                        .catch(error => {
                            console.error('App: Gagal memperbarui token silent.', error);
                        });
                }
            }
        };

        navigator.serviceWorker.addEventListener('message', handleSWMessage);

        return () => {
            navigator.serviceWorker.removeEventListener('message', handleSWMessage);
        };
    }, [auth, auth.isAuthenticated, auth.user])

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
