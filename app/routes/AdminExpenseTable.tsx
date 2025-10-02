import { useState, type JSX } from 'react';
import { type Expense, type Status } from "../types/expense";
import { useNavigate } from "react-router";
import mockExpenseData from '../data/mockExpenses.json';
import { Button, Dropdown, Table } from 'react-bootstrap';

import './table.css';

const statusOptions: Record<Status, string> = {
    'new': 'New',
    'pending': 'Pending',
    'approved': 'Approved',
    'denied': 'Denied',
}

export default function AdminExpenseTable() {
    const navigate = useNavigate();
    const [statusFilter, setStatusFiler] = useState<Status | null>(null);
    const mockData = mockExpenseData as Expense[];
    // useEffect(() => {
    //     console.log("this is the log from  Admin Expense Table");
    // }, [])

    let filteredData;
    if (statusFilter) {
        filteredData = mockData.filter((exp: Expense) => exp.status == statusFilter)
    } else {
        filteredData = mockData;
    }

    function handleFilter(status: Status | null) {
        setStatusFiler(status);
    }


    function handleApprove(id: string) {
        console.log('approve button clicked', id);
    }

    function handleDeny() {
        console.log('deny button clicked');
    }

    function handleComment(exp: Expense) {
        navigate("/admin/details", { state: { data: exp } })
    }

    function isActionable(status: Status): boolean {
        if (status === 'approved' || status === 'denied') {
            return true;
        }
        return false;
    }

    const ddOptions: JSX.Element[] = Object.entries(statusOptions).map(([key, value]) => {
        return (<Dropdown.Item key={key} as="button" onClick={() => handleFilter(key as Status)}>{value}</Dropdown.Item>);
    });

    const tableData: JSX.Element[] = filteredData.map((exp: Expense) => {
        return (
            <tr key={exp.id}>
                <td>{exp.employeeID}</td>
                <td>{exp.status}</td>
                <td>{exp.category}</td>
                <td>${exp.amount}</td>
                <td>{exp.createdAt}</td>
                <td>{exp.updatedAt}</td>
                <td>
                    <Button onClick={() => handleApprove(exp.id)} size="sm" variant="success" disabled={isActionable(exp.status)}>Approve</Button>
                    <Button onClick={handleDeny} size="sm" variant="danger" disabled={isActionable(exp.status)}>Deny</Button>
                    <Button onClick={() => handleComment(exp)} size="sm" variant="secondary" disabled={isActionable(exp.status)}>Comment</Button>
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
