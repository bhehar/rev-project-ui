import { useState } from 'react';
import { useLocation } from "react-router";
import { Button, Col, Form, Row } from 'react-bootstrap';

// import { type JSX } from 'react';
import { type Expense, type ExpenseCategory } from '../types/expense.ts';

const categoryDisplay: Record<ExpenseCategory, string> = {
    'transportation': "Transportation",
    'food': 'Food',
    'lodging': 'Lodging',
    'equipment': 'Equipment',
    'other': 'Other',
};

export default function UserExpenseDetails() {
    console.log("expense entry component rendered");
    const location = useLocation();
    const expense = location.state?.data as Expense;

    if (expense) {
        console.log("expense in UserExpenseDetails", expense);
    }
    // const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        category: expense?.category,
        amount: expense?.amount,
        description: expense?.description
    });


    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void {
        console.log("inside handleCategoryChange");
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const categoryOptions = Object.entries(categoryDisplay).map(([cat, display]) => {
        return <option key={cat} value={cat}>{display}</option>;
    });

    function handleSubmit(): void {
        console.log("submit called. here is the form data:", formData);
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
        <Form action={handleSubmit}>
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
    );
}