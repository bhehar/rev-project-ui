import { useState } from 'react';
import { useLocation } from "react-router";
import { type Expense } from "../types/expense";
import { Button, Col, Form, Row, InputGroup } from 'react-bootstrap';

// import { type JSX } from 'react';

export default function AdminExpenseDetails() {
    console.log("expense entry component rendered");
    // const [validated, setValidated] = useState(false);
    const location = useLocation();
    const expense = location.state?.data as Expense;
    const [formData, setFormData] = useState({
        employeeID: expense?.employeeId,
        status: expense?.status,
        category: expense?.category,
        amount: expense?.amount,
        createdAt: expense?.createdAt,
        updatedAt: expense?.updatedAt,
        description: expense?.description,
        comment: expense?.comment
    });


    function handleApprove(): void {
        console.log("approve called");
    }

    function handleDeny(): void {
        console.log("deny called");
    }

    function handlePending(): void {
        console.log("pending called!");
    }

    function handleComment(e: React.ChangeEvent<HTMLInputElement>): void {
        // console.log("inside handle comment", e)
        console.log(e.target);
        setFormData({
            ...formData,
            'comment': e.target.value,
        })
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
        <Form>
            <Row className="m-3">
                <Col>
                    <Form.Group controlId="employeeId">
                        <Form.Label>Employee ID</Form.Label>
                        <Form.Control value={formData.employeeID} type="text" readOnly disabled aria-label="expense employee id"></Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="expenseStatus">
                        <Form.Label>Status</Form.Label>
                        <Form.Control value={formData.status} type="text" readOnly disabled aria-label="expense status"></Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="expenseCategory">
                        <Form.Label>Category</Form.Label>
                        <Form.Control value={formData.category} type="text" readOnly disabled aria-label="expense category"></Form.Control>
                    </Form.Group>
                </Col>

            </Row>
            <Row className="m-3">
                <Col>
                    <Form.Group controlId="expenseAmount">
                            <Form.Label>Amount</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control value={formData.amount} type="number" placeholder="$0.00" readOnly disabled />
                        </InputGroup>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="expenseCreatedAt">
                        <Form.Label>Created At</Form.Label>
                        <Form.Control value={formData.createdAt} type="text" readOnly disabled />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="expenseUpdatedAt">
                        <Form.Label>Updated At</Form.Label>
                        <Form.Control value={formData.updatedAt} type="text" readOnly disabled />
                    </Form.Group>
                </Col>
            </Row>

            <Row className="m-3">
                <Col>
                    <Form.Group controlId="expenseDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control value={formData.description} as="textarea" rows={3} readOnly disabled></Form.Control>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="m-3">
                <Col>
                    <Form.Group controlId="expenseComment">
                        <Form.Label>Comments</Form.Label>
                        <Form.Control value={formData.comment} onChange={handleComment} as="textarea" rows={3}></Form.Control>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="m-3 justify-content-between">
                <Col>
                    <Button onClick={handleDeny} variant="danger" type="submit">
                        Deny
                    </Button>
                </Col>
                <Col>
                    <Button onClick={handlePending} variant="warning" type="submit">
                        Mark Pending
                    </Button>
                </Col>
                <Col>
                    <Button onClick={handleApprove} variant="success" type="submit">
                        Approve
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}