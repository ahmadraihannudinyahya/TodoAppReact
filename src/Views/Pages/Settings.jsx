import { useAuth } from 'react-oidc-context';
import { GlassCard } from '../Components/GlassCard';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { MasonryLayout } from '../Components/MasonryLayout';
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from 'react';


export const Settings = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const [user, setUster] = useState({
        name: '',
        email: ''
    })

    // switch (auth.activeNavigator) {
    //     case "signinSilent":
    //         return <div>Signing you in...</div>;
    //     case "signoutRedirect":
    //         return <div>Signing you out...</div>;
    // }

    // if (auth.isLoading) {
    //     return <div>Loading...</div>;
    // }

    // if (auth.error) {
    //     return <div>Oops... {auth.error.kind} caused {auth.error.message}</div>;
    // }


    // if (auth.user) {
    //     const idToken = auth.user.id_token;
    //     const decoded = jwtDecode(idToken);
    //     setUster({
    //         name: decoded.email || '',
    //         email: decoded.email || '', 
    //     })
    // }

    useEffect(() => {
        if (auth.user) {
            const idToken = auth.user.id_token;
            const decoded = jwtDecode(idToken);
            setUster({
                name: decoded.name || '',
                email: decoded.email || '',
            })
        }
    }, [auth.isAuthenticated])

    // if (auth.isAuthenticated) {
    //     return (
    //         <div>
    //             Hello {auth.user?.profile.sub}{" "}
    //             <button className='text-white px-4 sm:px-8 py-2 sm:py-3 bg-sky-700' onClick={() => {
    //                 auth.removeUser()
    //                 auth.signoutRedirect({
    //                     post_logout_redirect_uri: 'http://localhost:4000'
    //                 })
    //             }}>Log out</button>
    //         </div>
    //     );
    // }

    // return (
    //     <button
    //         className='text-white px-4 sm:px-8 py-2 sm:py-3 bg-sky-700'
    //         onClick={() => auth.signinRedirect()}
    //     >Log in</button>
    // );

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
                                        auth.removeUser()
                                        auth.signoutRedirect({
                                            post_logout_redirect_uri: 'http://localhost:4000/settings'
                                        })
                                    }}>Log out</button>
                            </>
                            : <button
                                className='text-theme-onsurface p-2 bg-[#B13BFF] rounded-xl'
                                onClick={() => auth.signinPopup()}
                            >Log in</button>
                        }
                    </div>
                </GlassCard>
            </MasonryLayout>
        </div>
    )
}