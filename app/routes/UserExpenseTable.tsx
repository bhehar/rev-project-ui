import { useState, type JSX } from 'react';
import { useNavigate } from "react-router";
import { Button, Dropdown, Table } from 'react-bootstrap';

import { type Expense, type Status } from "../types/expense";
import mockExpenseData from '../data/mockExpenses.json';

import './table.css';

const statusOptions: Record<Status, string> = {
    'new': 'New',
    'pending': 'Pending',
    'approved': 'Approved',
    'denied': 'Denied',
}

export default function UserExpenseTable() {
    // const rawJsonData = mockExpenseData;
    // console.log(rawJsonData);
    const [statusFilter, setStatusFiler] = useState<Status | null>(null);
    const navigate = useNavigate();
    const mockData = mockExpenseData as Expense[];
    // useEffect(() => {
    //     console.log("this is the log from use expense");
    // }, [])

    let filteredData;
    if (statusFilter) {
        filteredData = mockData.filter( (exp: Expense)  => exp.status == statusFilter)
    } else {
        filteredData = mockData;
    }

   
    function handleEdit(exp: Expense): void {
        // console.log("expense passed to handle edit:", exp);
        navigate("/user/details", { state: { data: exp } });
    }

    function handleFilter(status: Status | null) {
        setStatusFiler(status);
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
