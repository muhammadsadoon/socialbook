"use client";
import { dispatchSignInState } from '@/utils/redux/store/actions/auth-action/auth-action';
import { AppDispatch } from '@/utils/redux/store/store';
import { SendSignInFormHandlerType } from '@/utils/types/components-props';
import { Button, Checkbox, Group, PasswordInput, Text, TextInput, Typography } from '@mantine/core'
import { useForm } from "@mantine/form";
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';

const LogInScreen = () => {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            password: '',
            termsOfService: false,
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*+]).{8,}$/.test(value) ? null : 'Please enter the more stronger password be like 8 characters, numbers,special character...'),
        },
    });

    const dispatch = useDispatch<AppDispatch>();

    const signUpFromHanlder = (values: SendSignInFormHandlerType): void => {
        toast("😎 It's time to connect with us!");
        dispatch(dispatchSignInState(values));
    }

    return (
        <div className='min-h-dvh h-full w-full flex items-center justify-center flex-col gap-4'>
            <Toaster />
            <Typography><div
                className='text-3xl my-5 text-sky-500 font-semibold'
                dangerouslySetInnerHTML={{ __html: '<h1>Socialbook</h1>' }}
            /></Typography>
            <div className='min-h-[350px] w-[40vw] min-w-[300px] border border-slate-200 p-4 shadow rounded-sm'>
                <Typography><div
                    className='text-2xl my-5 text-slate-200 font-semibold'
                    dangerouslySetInnerHTML={{ __html: 'Log in' }}
                /></Typography>
                <form className='my-5' onSubmit={form.onSubmit((values) => signUpFromHanlder(values))}>
                    <TextInput
                        withAsterisk
                        label="Email"
                        placeholder="your@email.com"
                        required
                        key={form.key('email')}
                        {...form.getInputProps('email')}
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
                            Create an account!
                            <Link href={"/signup"} className='text-sky-500 mx-2'>Sign Up</Link>
                        </Text>
                    </Group>
                </form>
            </div>
        </div>
    )
}

export default LogInScreen;