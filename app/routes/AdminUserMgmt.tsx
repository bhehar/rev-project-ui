import { useState, type JSX } from 'react';
import { Button, Dropdown, Table } from 'react-bootstrap';

import type User from "../types/user";
import mockUserData from '../data/mockUsers.json';

import './table.css';

const jobTitleOptions: Record<string, string> = {
    'Software Engineer': 'Software Engineer',
    'Product Manager': 'Product Manager',
    'Designer': 'Designer',
    'Data Analyst': 'Data Analyst',
}

export default function AdminUserMgmt() {
    const [jobTitleFilter, setJobTitleFilter] = useState<string | null>(null);
    const mockData = mockUserData as User[];

    let filteredData;
    if (jobTitleFilter) {
        filteredData = mockData.filter((user: User) => user.jobTitle === jobTitleFilter)
    } else {
        filteredData = mockData;
    }

    function handleDelete(user: User): void {
        console.log("Deleting user:", user);
    }

    function handleFilter(jobTitle: string | null) {
        setJobTitleFilter(jobTitle);
    }

    const ddOptions: JSX.Element[] = Object.entries(jobTitleOptions).map(([key, value]) => {
        return (<Dropdown.Item key={key} as="button" onClick={() => handleFilter(key)}>{value}</Dropdown.Item>);
    });

    const tableData: JSX.Element[] = filteredData.map((user: User) => {
        return (
            <tr key={user.id}>
                <td>{user.employeeId}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.jobTitle}</td>
                <td>{user.manager}</td>
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
                <Dropdown className="my-2">
                    <Dropdown.Toggle variant="secondary">
                        Filter By Job Title
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item key={'all'} onClick={() => handleFilter(null)}>All</Dropdown.Item>
                        {ddOptions}
                    </Dropdown.Menu>
                </Dropdown>
            </header>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Job Title</th>
                        <th>Manager</th>
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
