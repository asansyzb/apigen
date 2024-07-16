'use client';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {User} from "@/app/page";
import {MouseEventHandler, useState} from "react";
import {Button} from "@/components/ui/button";
import {Edit, Trash} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import UserForm, {FormSchema} from "@/app/user-form";
import {z} from "zod";


export interface UsersTableProps {
    users: User[]
}

enum ACTION {
    EDIT = 'edit',
    DELETE = 'delete',
}


export default function UsersTable({users: _users}: UsersTableProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [users, setUsers] = useState<User[]>(_users);
    const [selectedUser, setSelectedUser] = useState<User>();

    const handleDelete = (id: number) => setUsers(prevState => prevState.filter(user => user.id !== id));

    const handleEdit = (id: number) => {
        const _selectedUser = users.find(x => x.id === id);
        if (!_selectedUser) {
            throw new Error(`Unknown user: ${id}`);
        }
        setOpen(true);
        setSelectedUser(_selectedUser);
    }

    const handleTableClick: MouseEventHandler<HTMLTableElement> = (e) => {
        const target = e.target;
        if (!(target instanceof HTMLElement)) {
            return
        }

        const _id = target.getAttribute('data-id');
        const action = target.getAttribute('data-action');

        if (!_id || !action) {
            return;
        }

        const id = parseInt(_id, 10);

        switch (action) {
            case ACTION.DELETE: {
                handleDelete(id);
                break;
            }
            case ACTION.EDIT: {
                handleEdit(id);
                break;
            }
            default: {
                throw new Error(`Unknown action: ${action}, id: ${id}`);
            }
        }

    }

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        setUsers(prevState => prevState.map(x => x.id === data.id ? ({...x, ...data}) : {...x}))
        setOpen(false);
    }

    return (
        <>
            <Table onClick={handleTableClick}>
                <TableCaption>A list of your users.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Sign Up Date</TableHead>
                        <TableHead>Last Login</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map(user => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>{user.status}</TableCell>
                            <TableCell>{user.signUpDate}</TableCell>
                            <TableCell>{user.lastLogin}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-x-2">
                                    <Button data-action={ACTION.EDIT} data-id={user.id} size="sm">
                                        <Edit className={"mr-2 h-4 w-4 pointer-events-none"}/>
                                        Edit
                                    </Button>
                                    <Button data-action={ACTION.DELETE} data-id={user.id} variant="destructive"
                                            size="sm">
                                        <Trash className={"mr-2 h-4 w-4 pointer-events-none"}/>
                                        Delete
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to user profile here. Click save when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>
                    {selectedUser && <UserForm selectedUser={selectedUser} onSubmit={onSubmit}/>}

                </DialogContent>
            </Dialog>
        </>

    );
}