import { Outlet, NavLink, redirect } from "react-router";
import { Navbar, Nav, Container } from "react-bootstrap";

import { useNavigate } from 'react-router';
import { useAuth } from '../AuthContext.tsx';

export async function clientLoader() {
  const dataStr = localStorage.getItem('user');
  if (!dataStr) {
    return redirect('/login');
  }
}

export default function NavLayout() {
  const auth = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    auth.logout();
    navigate('/login');
  }
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Expense Reimbursement</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/user/table">User Table</Nav.Link>
              {auth.user?.role == 'ADMIN' && <Nav.Link as={NavLink} to="/admin/table">Admin Table</Nav.Link>}
              {auth.user?.role == 'ADMIN' && <Nav.Link as={NavLink} to="/admin/manage-users">User Management</Nav.Link>}
            </Nav>
            <Nav className="justify-content-end">
              <Navbar.Text>
                Signed in as: {auth.user?.employeeId}
              </Navbar.Text>
              <Nav.Link onClick={handleLogout} >Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>

      </Navbar>
      <Container className="mt-4">
        <Outlet />
      </Container>
    </>
  );
}