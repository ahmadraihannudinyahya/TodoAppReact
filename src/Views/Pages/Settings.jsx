import { useAuth } from 'react-oidc-context';
import { GlassCard } from '../Components/GlassCard';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { MasonryLayout } from '../Components/MasonryLayout';
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from 'react';
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import {
    deleteDb
} from "../../infrastructure/repositories/idb"


export const Settings = () => {
    const navigate = useNavigate();
    const [isSyncing, setIsSyncing] = useState(false);
    const auth = useAuth();
    const [user, setUster] = useState({
        name: '',
        email: ''
    })

    const handleSync = () => {
        if (!isSyncing) {
            // 1. Set state loading menjadi TRUE dan tambahkan animasi
            setIsSyncing(true);

            // 2. Kirim pesan ke Service Worker
            if (navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller.postMessage("force-sync");
                console.log("Force sync triggered to Service Worker.");
            } else {
                console.warn("Service Worker controller not available.");
            }

            // 3. (PENTING) Atur waktu tunggu untuk mematikan animasi
            // Karena Service Worker tidak secara otomatis mengirim balasan "Selesai", 
            // kita menggunakan timer untuk menampilkan animasi selama beberapa detik.
            // Jika Anda ingin lebih akurat, Service Worker harus postMessage BALIK
            // ke aplikasi setelah sync selesai.
            setTimeout(() => {
                setIsSyncing(false);
                console.log("Sync animation finished.");
            }, 3000); // Animasi berputar selama 3 detik
        }
    };

    const handleLogout = async () => {
        await deleteDb()
        auth.removeUser()
        auth.signoutRedirect({
            post_logout_redirect_uri: `${window.location.origin}/settings`
        })
    }
    useEffect(() => {
        if (auth.user) {
            const idToken = auth.user.id_token;
            const decoded = jwtDecode(idToken);
            setUster({
                name: decoded.name || '',
                email: decoded.email || '',
            })
        }
    }, [auth, auth.isAuthenticated, auth.user])

    return (
        <div className="flex flex-col gap-2 bg-center p-5">
            <div className='flex flex-row items-center'>
                <button
                    onClick={() => navigate('/')}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition"
                    aria-label="Go Back"
                >
                    <ArrowLeftIcon className="w-6 h-6 text-theme-onbackground" />
                </button>
                <h1 className="text-2xl font-bold text-theme-onbackground ml-2">Settings</h1>
            </div>
            <MasonryLayout>
                <GlassCard>
                    <div className='flex flex-col gap-2 '>
                        <h1 className="text-2xl font-bold text-theme-onsurface">Account</h1>
                        {auth.isAuthenticated && !auth.isLoading ?
                            <>
                                <h3
                                    className="text-medium font-medium text-theme-onsurface"
                                >{user.name}</h3>
                                <hr className="border-t border-gray-300 dark:border-gray-600 my-1" />
                                <h3
                                    className="text-medium font-medium text-theme-onsurface"
                                >{user.email}</h3>
                                <button
                                    className='text-white p-2 bg-red-700 rounded-xl'
                                    onClick={() => {
                                        handleLogout()
                                    }}>Log out</button>
                            </>
                            : <button
                                className='text-theme-onsurface p-2 bg-[#B13BFF] rounded-xl'
                                onClick={() => auth.signinPopup()}
                            >Log in</button>
                        }
                    </div>
                </GlassCard>

                {auth.isAuthenticated && <GlassCard>
                    <div className='flex flex-row gap-2 justify-between'>
                        <h1 className="text-2xl font-bold text-theme-onsurface">Sync</h1>
                        <button
                            className='text-theme-onsurface p-2 bg-[#B13BFF] rounded-xl'
                            onClick={() => {
                                handleSync()
                                navigator.serviceWorker.controller.postMessage({
                                    type: 'FORCE_SYNC',
                                })
                            }}
                        >
                            <ArrowPathIcon
                                className={`w-6 h-6 text-theme-onsurface ${isSyncing ? 'animate-spin' : ''}`}
                            />
                        </button>
                    </div>
                </GlassCard>}
            </MasonryLayout>
        </div>
    )
}