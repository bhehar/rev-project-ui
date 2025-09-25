import { useEffect, type JSX } from 'react';
import { type Expense } from "../types/expense";
import mockExpenseData from '../data/mockExpenses.json';
import Button from 'react-bootstrap/Button';

import Table from 'react-bootstrap/Table';

export default function AdminExpenseTable() {

    const mockData = mockExpenseData as Expense[];
    useEffect(() => {
        console.log("this is the log from  Admin Expense Table");
    }, [])

    function handleApprove() {
        console.log('approve button clicked');
    }

    function handleDeny() {
        console.log('deny button clicked');
    }
    const tableData: JSX.Element[] = mockData.map((exp: Expense) => {
        return (
            <tr key={exp.id}>
                <td>{exp.employeeID}</td>
                <td>{exp.status}</td>
                <td>{exp.category}</td>
                <td>${exp.amount}</td>
                <td>{exp.createdAt}</td>
                <td>{exp.updatedAt}</td>
                <td>
                    <Button onClick={handleApprove} size="sm" variant="success">Approve</Button>
                    <Button onClick={handleDeny} size="sm" variant="danger">Deny</Button>
                    <Button href="/admin/details" size="sm" variant="secondary">Comment</Button>
                </td>
            </tr>
        )
    })

    return (
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
    )
}
