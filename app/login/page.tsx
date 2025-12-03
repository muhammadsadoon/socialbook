"use client";
import { app } from '@/utils/firebase';
import { dispatchSignInState } from '@/utils/redux/store/actions/auth-action/auth-action';
import { AppDispatch } from '@/utils/redux/store/store';
import { SendSignInFormHandlerType } from '@/utils/types/components-props';
import { Button, Checkbox, Group, PasswordInput, Stack, Text, TextInput, Typography } from '@mantine/core'
import { useForm } from "@mantine/form";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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

    // navigation router defined here....
    const router = useRouter();

    // dispatch functions defined here...
    const dispatch = useDispatch<AppDispatch>();

    // Sign In Handler
    const signInFromHanlder = (values: SendSignInFormHandlerType): void => {
        dispatch(dispatchSignInState(values)).finally(() => {
            toast("🥳 Form is submitted");
            form.reset();
            onAuthStateChanged(getAuth(app), async (user) => {
                if (user) {
                    router.push('/');
                } else {
                }
            });
        });
    }

    return (
        <div className='min-h-[80vh] h-full w-full flex items-center justify-center flex-col gap-4'>
            <Toaster />
            <Stack className='min-h-[350px] bg-white w-[40vw] min-w-[300px] border border-slate-200 p-4 shadow rounded-sm'>
                <Text size='xl' color='blue' fw={700}>
                    Sign In
                </Text>
                <form className='my-5' onSubmit={form.onSubmit((values) => signInFromHanlder(values))}>
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
            </Stack>
        </div>
    )
}

export default LogInScreen;