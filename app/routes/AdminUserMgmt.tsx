import { type JSX } from 'react';
import { useRevalidator } from 'react-router';
import { Button, Table } from 'react-bootstrap';
import type { Route } from "./routes/+types/AdminUserMgmt.ts";

import type User from "../types/user";
// import mockUserData from '../data/mockUsers.json';

import './app.css';

// const jobTitleOptions: Record<string, string> = {
//     'Software Engineer': 'Software Engineer',
//     'Product Manager': 'Product Manager',
//     'Designer': 'Designer',
//     'Data Analyst': 'Data Analyst',
// }

export async function clientLoader() {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user?role=USER`);
    const users = await res.json();
    // console.log('clientLoader params:' + params);
    return users;
}

export default function AdminUserMgmt({ loaderData }: Route.ComponentProps) {
    // console.log(loaderData);
    // const [jobTitleFilter, setJobTitleFilter] = useState<string | null>(null);
    // const mockData = loaderData as User[];

    const revalidator = useRevalidator();

    const filteredData = loaderData as User[];
    // if (jobTitleFilter) {
    //     filteredData = mockData.filter((user: User) => user.jobTitle === jobTitleFilter)
    // } else {
    //     filteredData = mockData;
    // }

    async function handleDelete(user: User) {
        console.log("Deleting user:", user);
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/${user.id}`, {
            method: 'DELETE'
        })

        if (!res.ok) {
            const error = await res.text();
            console.error('Delete failed:', error);
            alert('Failed to delete user');
            return;
        }
        revalidator.revalidate();
    }

    // function handleFilter(jobTitle: string | null) {
    //     setJobTitleFilter(jobTitle);
    // }

    // const ddOptions: JSX.Element[] = Object.entries(jobTitleOptions).map(([key, value]) => {
    //     return (<Dropdown.Item key={key} as="button" onClick={() => handleFilter(key)}>{value}</Dropdown.Item>);
    // });

    const tableData: JSX.Element[] = filteredData.map((user: User) => {
        return (
            <tr key={user.id}>
                <td>{user.employeeId}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.jobTitle}</td>
                <td>
                    <Button onClick={() => handleDelete(user)} variant='danger'>Delete</Button>
                </td>
            </tr>
        )
    })

    return (
        <>
            <header className="table-header">
                <h1>Manage Users</h1>
                {/* <Dropdown className="my-2">
                    <Dropdown.Toggle variant="secondary">
                        Filter By Job Title
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item key={'all'} onClick={() => handleFilter(null)}>All</Dropdown.Item>
                        {ddOptions}
                    </Dropdown.Menu>
                </Dropdown> */}
            </header>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Job Title</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData}
                </tbody>
            </Table>
        </>
    )
}
