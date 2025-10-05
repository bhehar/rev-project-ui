import { redirect } from "react-router";

import type User from '../types/user.ts';

export async function clientLoader() {
    const dataStr = localStorage.getItem('user');
    if (!dataStr) {
        return redirect('/login');
    }

    const user = JSON.parse(dataStr) as User;
    if (user.role !== 'ADMIN') {
        alert("you can't access admin tools!");
        return redirect('/');
    } 
}