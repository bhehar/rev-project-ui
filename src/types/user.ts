export default interface User {
    id: string,
    employeeId: string,
    firstName: string,
    lastName: string,
    manager: string // probably not necessary
    email: string,
    jobTitle: string,
}