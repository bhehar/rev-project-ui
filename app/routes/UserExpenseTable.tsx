import { useEffect, type JSX } from 'react';
import { useNavigate } from "react-router";
import { Button, Dropdown, Table } from 'react-bootstrap';

import { type Expense } from "../types/expense";
import mockExpenseData from '../data/mockExpenses.json';

import './userExpenseTable.css';

export default function UserExpenseTable() {
    // const rawJsonData = mockExpenseData;
    // console.log(rawJsonData);
    const navigate = useNavigate();
    const mockData = mockExpenseData as Expense[];
    useEffect(() => {
        console.log("this is the log from use expense");
    }, [])

    function handleEdit(exp: Expense): void {
        // console.log("expense passed to handle edit:", exp);
        navigate("/user/details", { state: { data: exp } });
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
                    <Button onClick={() => handleEdit(exp)} variant='secondary'>Edit</Button>
                </td>
            </tr>
        )
    })

    return (
        <>
            <header id="userTableHeader">
                <h1>Existing Expenses</h1>
                <Dropdown>
                    <Dropdown.Toggle variant="secondary">
                        Filter By Status
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Button href='/user/details' className='my-2 mx-1' variant="primary">Create New</Button>
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
