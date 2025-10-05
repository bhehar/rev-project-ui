import { createContext, useState, useContext } from 'react';
import type User from './types/user.ts';

type AuthContextType = {
    user: User | null;
    login: (employeeId: string, password: string) => Promise<User | null>;
    logout: () => void;
}

export const UserContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>( () => {
        const stored = localStorage.getItem('user');
        return stored ? JSON.parse(stored) : null;
    });

    const login = async (empId: string, pwd: string): Promise<User | null> => {
        const resp = await fetch(`${import.meta.env.VITE_API_URL}/api/user/login`, {
            method: 'POST',
            body: JSON.stringify({
                employeeId: empId,
                password: pwd,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (!resp.ok) {
            console.log("login failed!", resp.status);
            alert("login failed with status: " + resp.status);
            return null;
        }

        const result = await resp.json();
        setUser(result)
        localStorage.setItem('user', JSON.stringify(result));
        return result;
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    }

    const value = { user, login, logout };

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