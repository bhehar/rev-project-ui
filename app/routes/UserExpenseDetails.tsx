import { useState } from 'react';
import { useLocation, useNavigate, useParams } from "react-router";
import { Button, Col, Form, Row } from 'react-bootstrap';

// import { type JSX } from 'react';
import { type Expense, type ExpenseCategory } from '../types/expense.ts';

import { useAuth } from '../AuthContext.tsx';
const categories: ExpenseCategory[] = ['TRANSPORTATION', 'FOOD', 'LODGING', 'EQUIPMENT', 'OTHER'];

export default function UserExpenseDetails() {
    // console.log("expense entry component rendered");
    const location = useLocation();
    const expense = location.state?.data as Expense;
    const { mode } = useParams();
    const auth = useAuth();
    const navigate = useNavigate();
    // if (expense) {
    //     console.log("expense in UserExpenseDetails", expense);
    // }
    // const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        category: expense?.category,
        amount: expense?.amount,
        description: expense?.description
    });


    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void {
        // console.log("inside handleCategoryChange");
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const categoryOptions = categories.map((cat) => {
        return <option key={cat} value={cat}>{cat}</option>;
    });

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log("submit called. here is the form data:", formData);
        let url = `${import.meta.env.VITE_API_URL}/api/expense`
        url = mode === 'new' ? url : url + '/' + expense.id;
        const method = mode === 'new' ? 'POST' : 'PUT';

        const body = mode === 'new' ? { ...formData, employeeId: auth.user?.employeeId } : formData;
        console.log(formData);
        const resp = await fetch(url, {
            method,
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!resp.ok) {
            console.log('expense update error with status:', resp.status);
            alert('update expense failed with status: ' + resp.status);
            return
        }

        navigate('/user/table');
    }

    // const handleSubmit = (event) => {
    //     const form = event.currentTarget;
    //     if (form.checkValidity() === false) {
    //         event.preventDefault();
    //         event.stopPropagation();
    //     }

    //     setValidated(true);
    // };
    return (
        <Form onSubmit={handleSubmit}>
            <Row className="m-3">
                <Col>
                    <Form.Group controlId="expenseCategory">
                        <Form.Label>Category</Form.Label>
                        <Form.Select name="category" value={formData.category} onChange={handleChange} aria-label="expense category selection">
                            <option>Select a category</option>
                            {categoryOptions}
                        </Form.Select>
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group controlId="expenseAmount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control name="amount" value={formData.amount} onChange={handleChange} type="number" placeholder="$0.00" />
                    </Form.Group>
                </Col>
            </Row>
            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}
            <Row className="m-3">
                <Col>
                    <Form.Group controlId="expenseDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control name="description" value={formData.description} onChange={handleChange} as="textarea" rows={3}></Form.Control>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="m-3">
                <Col>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}