import { useState, type JSX } from 'react';
import { useNavigate } from "react-router";
import { Button, Dropdown, Table } from 'react-bootstrap';

import { type Expense, type Status } from "../types/expense";
// import mockExpenseData from '../data/mockExpenses.json';
import type { Route } from "./routes/+types/UserExpenseTable.tsx";

import type User from '../types/user.ts';
import './app.css';

const statusOptions: Status[] = ['NEW', 'APPROVED', 'DENIED']

export async function clientLoader() {
    const dataStr = localStorage.getItem('user');
    // the case of use not being logged-in is handled by loader in app/layouts/nav.tsx
    if (dataStr) {
        const user = JSON.parse(dataStr) as User;
        const resp = await fetch(`${import.meta.env.VITE_API_URL}/api/expense?employeeId=${user?.employeeId}`)
        if (!resp.ok) {
            alert('unable to fetch expense data');
            throw new Error('expense fetch failed with status: ' + resp.status);
        }
        return await resp.json();
    }
}

export default function UserExpenseTable({ loaderData }: Route.ComponentProps) {
    // const rawJsonData = mockExpenseData;
    // console.log(rawJsonData);
    const [statusFilter, setStatusFiler] = useState<Status | null>(null);
    const navigate = useNavigate();
    // const mockData = mockExpenseData as Expense[];
    const expenseData = loaderData as Expense[];
    // useEffect(() => {
    //     console.log("this is the log from use expense");
    // }, [])

    let filteredData;
    if (statusFilter) {
        filteredData = expenseData.filter((exp: Expense) => exp.status == statusFilter)
    } else {
        filteredData = expenseData;
    }


    function handleEdit(exp: Expense): void {
        // console.log("expense passed to handle edit:", exp);
        navigate("/user/details/edit", { state: { data: exp } });
    }

    function handleFilter(status: Status | null) {
        setStatusFiler(status);
    }



    const ddOptions: JSX.Element[] = statusOptions.map( op => {
        return (<Dropdown.Item key={op} as="button" onClick={() => handleFilter(op)}>{op}</Dropdown.Item>);
    });

    const tableData: JSX.Element[] = filteredData.map((exp: Expense) => {
        return (
            <tr key={exp.id}>
                {/* <td>{exp.employeeId}</td> */}
                <td>{exp.status}</td>
                <td>{exp.category}</td>
                <td>${exp.amount}</td>
                <td>{new Date(exp.createdAt).toLocaleString()}</td>
                <td>{new Date(exp.updatedAt).toLocaleString()}</td>
                <td>
                    <Button onClick={() => handleEdit(exp)} variant='secondary'>Edit</Button>
                </td>
            </tr>
        )
    })

    return (
        <>
            <header className="table-header">
                <h1>Existing Expenses</h1>
                <Dropdown className="my-2">
                    <Dropdown.Toggle variant="secondary">
                        Filter By Status
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item key={'all'} onClick={() => handleFilter(null)}>All</Dropdown.Item>
                        {ddOptions}
                    </Dropdown.Menu>
                </Dropdown>
                <Button href='/user/details/new' className='my-2 mx-1' variant="primary">Create New</Button>
            </header>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {/* <th>Employee ID</th> */}
                        <th>Status</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Created At</th>
                        <th>Update At</th>
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
