import { useState, type JSX } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Table from 'react-bootstrap/Table';

import './App.css'
import mockPermData from './data/mock-permissions.json';

// string literal union type
type Role = "admin" | "billing-manager" | "sales-manager"
const roleLabels = {
  "admin": "Admin",
  "billing-manager": "Billing Manager",
  "sales-manager": "Sales Manager",
}

type AccessLevel = 0 | 1 | 2 | 3;
type PermissionCategories = Record<string, Record<string, AccessLevel>>;

interface Permission {
  "id": number;
  "role": Role;
  "permissions": PermissionCategories;
}
export default function App() {
  const [role, setRole] = useState<Role>("admin");
  const [rolePerms, setRolePerms] = useState<Permission | null>(null);
  const mockPermissions = mockPermData as Permission[];
  function handleRoleSelection(selectedRole: Role): void {
    setRole(selectedRole)
    console.log(selectedRole);
    const perms = mockPermissions.find(permission => permission.role === selectedRole);
    if (perms) {
      console.log(perms);
      setRolePerms(perms)
    }
  }

  return (
    <div id='app'>
      <RoleDropdown currRole={role} selectRole={handleRoleSelection} />
      <PermissionTable currRolePerms={rolePerms} />
    </div>
  )
}

interface RoleDropdownProps {
  currRole: Role;
  selectRole: (role: Role) => void;
}

function RoleDropdown({ currRole, selectRole }: RoleDropdownProps) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant='success' id='dropdown-basic'>
        {roleLabels[currRole]}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => selectRole('admin')}>{roleLabels.admin}</Dropdown.Item>
        <Dropdown.Item onClick={() => selectRole('billing-manager')}>{roleLabels['billing-manager']}</Dropdown.Item>
        <Dropdown.Item onClick={() => selectRole('sales-manager')}>{roleLabels['sales-manager']}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

interface PermissionTableProps {
  currRolePerms: Permission | null;
}

function PermissionTable({ currRolePerms }: PermissionTableProps) {

  const tableData: JSX.Element[] = [];

  if (currRolePerms) {
    for (const [category, permObj] of Object.entries(currRolePerms?.permissions)) {
      // console.log(category);
      for (const [module, accessLevel] of Object.entries(permObj)) {
        tableData.push(
          <tr key={`${category}-${module}`}>
            <td>{category}</td>
            <td>{module}</td>
            <td>{accessLevel}</td>
          </tr>
        );
      }
    }
  };
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Category</th>
          <th>Module</th>
          <th>Access Level</th>
        </tr>
      </thead>
      <tbody>
        {tableData}
      </tbody>
    </Table>
  )
}
