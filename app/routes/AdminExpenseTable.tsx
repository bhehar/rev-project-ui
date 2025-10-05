import { useState, type JSX } from 'react';
import { type Expense, type Status } from "../types/expense";
import { useNavigate, useRevalidator } from "react-router";
// import mockExpenseData from '../data/mockExpenses.json';
import { Button, Dropdown, Table } from 'react-bootstrap';
import { useAuth } from '../AuthContext.tsx';
import type { Route } from "./routes/+types/AdminExpenseTable.ts";
import './app.css';

const statusOptions: Status[] = ['NEW', 'APPROVED', 'DENIED']

export async function clientLoader() {
    const resp = await fetch(`${import.meta.env.VITE_API_URL}/api/expense`)
    if (!resp.ok) {
        alert('unable to fetch expense data');
        throw new Error('expense fetch failed with status: ' + resp.status);
    }
    return await resp.json();
}

export default function AdminExpenseTable({ loaderData }: Route.ComponentProps) {
    const navigate = useNavigate();
    const auth = useAuth();
    const revalidator = useRevalidator();
    const [statusFilter, setStatusFiler] = useState<Status | null>(null);
    const expenseData = loaderData as Expense[];
    // useEffect(() => {
    //     console.log("this is the log from  Admin Expense Table");
    // }, [])

    let filteredData;
    if (statusFilter) {
        filteredData = expenseData.filter((exp: Expense) => exp.status == statusFilter)
    } else {
        filteredData = expenseData;
    }

    function handleFilter(status: Status | null) {
        setStatusFiler(status);
    }


    async function handleAction(id: string, newStatus: Status) {
        const resp = await fetch(`${import.meta.env.VITE_API_URL}/api/expense/${id}/status`, {
            method: 'PUT',
            body: JSON.stringify({
                status: newStatus,
                employeeId: auth.user?.employeeId,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!resp.ok) {
            console.log(`expense status update to ${newStatus} failed with code:`, resp.status);
            alert('unable to update expense status');
            return
        }
        revalidator.revalidate();
    }

    function isActionable(status: Status): boolean {
        return status === 'NEW';
    }

    const ddOptions: JSX.Element[] = statusOptions.map(op => {
        return (<Dropdown.Item key={op} as="button" onClick={() => handleFilter(op)}>{op}</Dropdown.Item>);
    });

    const tableData: JSX.Element[] = filteredData.map((exp: Expense) => {
        return (
            <tr key={exp.id}>
                <td>{exp.employeeId}</td>
                <td>{exp.status}</td>
                <td>{exp.category}</td>
                <td>${exp.amount}</td>
                <td>{new Date(exp.createdAt).toLocaleString()}</td>
                <td>{new Date(exp.updatedAt).toLocaleString()}</td>
                <td>
                    <Button onClick={() => handleAction(exp.id, 'APPROVED')} size="sm" variant="success" disabled={!isActionable(exp.status)}>Approve</Button>
                    <Button onClick={() => handleAction(exp.id, 'DENIED')} size="sm" variant="danger" disabled={!isActionable(exp.status)}>Deny</Button>
                    {/* <Button onClick={() => handleComment(exp)} size="sm" variant="secondary" disabled={isActionable(exp.status)}>Comment</Button> */}
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
            </header>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Employee ID</th>
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
