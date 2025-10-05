export default interface User {
    id: string,
    employeeId: string,
    firstName: string,
    lastName: string,
    email: string,
    role: 'ADMIN' | 'USER',
    password: string,
    jobTitle: string,
}