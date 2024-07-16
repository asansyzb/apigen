import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {User} from "@/app/page";
import {z} from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {DialogFooter} from "@/components/ui/dialog";


const roles = ['Admin', 'User', 'Manager'] as const;
const statuses = ['Active', 'Pending', 'Inactive'] as const;

export interface UserFormProps {
    selectedUser: User;
    onSubmit: (data: z.infer<typeof FormSchema>) => void;
}

export const FormSchema = z.object({
    id: z.number(),
    name: z.string().min(2).max(50),
    email: z.string().email(),
    role: z.enum(roles),
    status: z.enum(statuses),
})

export default function UserForm({selectedUser, onSubmit: onSubmit}: UserFormProps) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: selectedUser
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-4 py-4">
                    <FormField
                        control={form.control}
                        name="id"
                        render={({field}) => (
                            <FormItem className="hidden">
                                <FormLabel className="text-right">id</FormLabel>
                                <FormControl className="col-span-3"
                                >
                                    <Input placeholder="Id" {...field} />
                                </FormControl>
                                <FormMessage className="text-right w-full col-span-4"/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem className="grid grid-cols-4 items-center gap-4">
                                <FormLabel className="text-right">Name</FormLabel>
                                <FormControl className="col-span-3"
                                >
                                    <Input placeholder="Name" {...field} />
                                </FormControl>
                                <FormMessage className="text-right w-full col-span-4"/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem className="grid grid-cols-4 items-center gap-4">
                                <FormLabel className="text-right">Email</FormLabel>
                                <FormControl className="col-span-3"
                                >
                                    <Input placeholder="Email" {...field} />
                                </FormControl>
                                <FormMessage className="text-right w-full col-span-4"/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="role"
                        render={({field}) => (
                            <FormItem className="grid grid-cols-4 items-center gap-4">
                                <FormLabel className="text-right">Role</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select a role"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {roles.map(role => (
                                            <SelectItem key={role} value={role}>{role}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage className="text-right w-full col-span-4"/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="status"
                        render={({field}) => (
                            <FormItem className="grid grid-cols-4 items-center gap-4">
                                <FormLabel className="text-right">Status</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select a status"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {statuses.map(status => (
                                            <SelectItem key={status} value={status}>{status}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage className="text-right w-full col-span-4"/>
                            </FormItem>
                        )}
                    />
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </form>
        </Form>
    );
}