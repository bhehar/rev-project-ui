import { createContext, useState, useContext } from 'react';
import type User from './types/user.ts';

type AuthContextType = {
    user: User | null;
    login: (employeeId: string, password: string) => Promise<void>;
    logout: () => void;
}

export const UserContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    const login = async (employeeId: string, password: string) => {
        const resp = await fetch(`${import.meta.env.VITE_API_URL}/api/user/login`, {
            method: 'POST',
            body: JSON.stringify({
                'employeeId': employeeId,
                'password': password,
            })
        })

        if (!resp.ok) {
            console.log("login failed!", resp.status);
        }

        const result = await resp.json();
        setUser(result)
        localStorage.setItem('user', JSON.stringify(result));
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    }

    const value = {user, login, logout};

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('userAuth must be used within AuthProvider');
    }
    return context;
}