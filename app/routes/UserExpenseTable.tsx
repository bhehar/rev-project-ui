import { useEffect, type JSX } from 'react';
import { type Expense } from "../types/expense";
import mockExpenseData from '../data/mockExpenses.json';

import Table from 'react-bootstrap/Table';

export default function ExpenseTable() {
    // const rawJsonData = mockExpenseData;
    // console.log(rawJsonData);
    const mockData = mockExpenseData as Expense[];
    useEffect(() => {
        console.log("this is the log from use expense");
    }, [])

    const tableData: JSX.Element[] = mockData.map((exp: Expense) => {
        return (
            <tr key={exp.id}>
                <td>{exp.employeeID}</td>
                <td>{exp.status}</td>
                <td>{exp.category}</td>
                <td>${exp.amount}</td>
                <td>{exp.createdAt}</td>
                <td>{exp.updatedAt}</td>
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
                </tr>
            </thead>
            <tbody>
                {tableData}
            </tbody>
        </Table>
    )
}
