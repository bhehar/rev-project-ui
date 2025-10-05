
export type ExpenseCategory = 'TRANSPORTATION' | 'FOOD' | 'LODGING' | 'EQUIPMENT' | 'OTHER';

export type Status = 'NEW' | 'APPROVED' | 'DENIED';
export interface Expense {
    id: string,
    employeeId: string,
    status: Status,
    createdAt: string,
    updatedAt: string,
    category: ExpenseCategory,
    amount: number,
    description: string,
    comment: string
}