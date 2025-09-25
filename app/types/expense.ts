
export type ExpenseCategory = 'transportation' | 'food' | 'lodging' | 'equipment' | 'other';

export interface Expense {
    id: string,
    employeeID: string,
    status: 'new' | 'pending' | 'approved' | 'denied',
    createdAt: string,
    updatedAt: string,
    category: ExpenseCategory,
    amount: number,
    description: string,
    comment: string
}

/*
    Okay, so let's think through this:
    User (employee):
        - new reimbursement
            - crates new reimbursement
                - if category == 'other' then description required otherwise optional
            - status: new
            - createdAt and UpdateAt: are populated

        - pending reimbursement
            - change category, amount, and description
                - ofc description, no longer required if switching from other to a different category

    Admin:
        - can add comments if desired when approving
        - comments required when denying
        - comments required when setting status to pending
            - pending means they want the user to make changes
        - updateAt when Admin makes any changes
*/