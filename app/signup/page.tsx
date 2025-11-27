"use client";
import { Button, Checkbox, Group, PasswordInput, Stack, Text, TextInput, Typography } from '@mantine/core'
import { useForm } from "@mantine/form";
import Link from 'next/link';
const SignUpScreen = () => {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            email: '',
            phone: '',
            password: '',
            termsOfService: false,
        },
        validate: {
            name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
            phone: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*+]).{8,}$/.test(value) ? null : 'Please enter the more stronger password be like 8 characters, numbers,special character...'),
        },
    });
    
    return (
        <div className='min-h-dvh h-full w-full flex items-center justify-center flex-col gap-4'>
            <Typography><div
                className='text-3xl my-5 text-sky-500 font-semibold'
                dangerouslySetInnerHTML={{ __html: '<h1>Socialbook</h1>' }}
            /></Typography>
            <div className='min-h-[350px] w-[40vw] min-w-[300px] border border-slate-200 p-4 shadow rounded-sm'>
                <Typography><div
                    className='text-2xl my-5 text-slate-200 font-semibold'
                    dangerouslySetInnerHTML={{ __html: 'Sign up' }}
                /></Typography>
                <form className='my-5' onSubmit={form.onSubmit((values) => console.log(values))}>
                    <TextInput
                        withAsterisk
                        label="Name"
                        placeholder="Muhammad Ali"
                        required
                        key={form.key('name')}
                        {...form.getInputProps('name')}
                    />
                    <TextInput
                        withAsterisk
                        label="Email"
                        placeholder="your@email.com"
                        required
                        key={form.key('email')}
                        {...form.getInputProps('email')}
                    />
                    <TextInput
                        withAsterisk
                        label="Phone"
                        placeholder="03123*****3"
                        required
                        key={form.key('phone')}
                        {...form.getInputProps('phone')}
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="type your own password"
                        required
                        key={form.key('password')}
                        {...form.getInputProps('password')}
                    />
                    <Checkbox
                        mt="md"
                        label="I agree to sell my privacy"
                        key={form.key('termsOfService')}
                        {...form.getInputProps('termsOfService', { type: 'checkbox' })}
                    />
                    <Group justify="flex-start" mt="md">
                        <Button type="submit" className='bg-sky-500'>Submit</Button>
                        <Text>
                            I have already account
                            <Link href={"/signin"} className='text-sky-500 mx-2'>Sign in</Link>
                        </Text>
                    </Group>
                </form>
            </div>
        </div>
    )
}

export default SignUpScreen
