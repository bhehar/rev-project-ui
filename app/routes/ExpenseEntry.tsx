import { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

// import { type JSX } from 'react';
import { type ExpenseCategory } from '../types/expense.ts';

const categoryDisplay: Record<ExpenseCategory, string> = {
    'transportation': "Transportation",
    'food': 'Food',
    'lodging': 'Lodging',
    'equipment': 'Equipment',
    'other': 'Other',
};

export default function ExpenseEntry() {
    console.log("expense entry component rendered");
    // const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        category: '',
        amount: '',
        description: ''
    });


    function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>): void {
        setFormData({
            ...formData,
            category: e.target.value
        });
    }

    const categoryOptions = Object.entries(categoryDisplay).map(([cat, display]) => {
        return <option key={cat} value={cat}>{display}</option>;
    });

    function handleSubmit(): void {
        console.log("submit called");
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
                        <Form.Select value={formData.category} onChange={handleCategoryChange} aria-label="expense category selection">
                            <option>Select a category</option>
                            {categoryOptions}
                        </Form.Select>
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group controlId="expenseAmount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="number" placeholder="$0.00" />
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
                        <Form.Control as="textarea" rows={3}></Form.Control>
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