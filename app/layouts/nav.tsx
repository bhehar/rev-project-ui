import { Outlet, NavLink } from "react-router";
import { Navbar, Nav, Container } from "react-bootstrap";

export default function NavLayout() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Expense Reimbursement</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/user/table">User Table</Nav.Link>
            <Nav.Link as={NavLink} to="/admin/table">Admin Table</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <Outlet />
      </Container>
    </>
  );
}