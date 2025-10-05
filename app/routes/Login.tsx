import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useAuth } from '../AuthContext.tsx';

import './app.css';

export default function LoginPage() {
    const auth = useAuth();
    const navigate = useNavigate();
    async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const employeeId = formData.get('employeeId') as string;
        const password = formData.get('password') as string;

        console.log(employeeId, password);

        const user = await auth.login(employeeId, password)
        if (user) {
            navigate('/');
        }
    }

    return (
        <div id="formContainer">
            <Form onSubmit={handleLogin} id="loginForm">
                <Form.Group className="mb-3" controlId="employeeId">
                    <Form.Label>Employee ID</Form.Label>
                    <Form.Control type="text" name="employeeId" placeholder="EMPxxx" />
                    {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text> */}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit" id="loginBtn">
                    Login
                </Button>
            </Form>
        </div>
    )
}