
import React, { createContext, Dispatch, ReactNode, useContext, useState, useEffect, useRef } from "react";
import { DataLocalStorage } from "../config/data-local-storage";

interface AuthContextType {
    session: Session | null
    setSession: Dispatch<React.SetStateAction<Session | null>>
}

export type validsRols = 1 | 2

export interface UserData {
    id: number;
    name: string;
    lastName: string;
    email: string;
    username: string;
}

export interface Session {
    token: string;
    user: UserData;
    tipo: validsRols;
}

interface Props {
    children: ReactNode
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: Props) => {
    const [session, setSession] = useState<Session | null>(DataLocalStorage.getSessionInLocalStorage());
    const hadInitialSession = useRef(DataLocalStorage.hasSession());

    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'session') {
                if (e.newValue === null) {
                    setSession(null);
                    if (hadInitialSession.current && window.location.pathname !== '/login') {
                        window.location.assign('/login');
                    }
                } else {
                    const newSession = DataLocalStorage.getSessionInLocalStorage();
                    setSession(newSession);
                }
            }
        };

        const checkSession = () => {
            if (hadInitialSession.current && !DataLocalStorage.hasSession() && window.location.pathname !== '/login') {
                setSession(null);
                window.location.assign('/login');
            }
        };

        window.addEventListener('storage', handleStorageChange);
        const intervalId = setInterval(checkSession, 1000);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(intervalId);
        };
    }, []);

    return (
        <AuthContext.Provider value={{ session, setSession }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuthContext debe utilizarse dentro de un AuthProvider')
    return context;
};