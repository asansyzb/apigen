import UsersTable from "@/app/users-table";

export type Role = 'Admin' | 'User' | 'Manager';
export type Status = 'Active' | 'Inactive' | 'Pending';

export type User = {
    id: number;
    name: string;
    email: string;
    role: Role;
    status: Status;
    signUpDate: string;
    lastLogin: string;
}

const users: User[] = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'Admin',
        status: 'Active',
        signUpDate: '2023-01-15',
        lastLogin: '2024-07-01'
    }, {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        role: 'User',
        status: 'Inactive',
        signUpDate: '2023-03-22',
        lastLogin: '2023-12-15'
    },
    {
        id: 3,
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        role: 'User',
        status: 'Active',
        signUpDate: '2023-05-10',
        lastLogin: '2024-06-30',
    },
    {
        id: 4,
        name: 'Bob Brown',
        email: 'bob.brown@example.com',
        role: 'Manager',
        status: 'Pending',
        signUpDate: '2023-07-01',
        lastLogin: '2023-07-01'
    },
    {
        id: 5,
        name: 'Charlie Davis',
        email: 'charlie.davis@example.com',
        role: 'User',
        status: 'Active',
        signUpDate: '2023-08-14',
        lastLogin: '2024-06-28'
    }
];

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <UsersTable users={users}/>
        </main>
    );
}
