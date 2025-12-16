"use client";
import { auth } from '@/utils/firebase';
import { dispatchSignInState, dispatchSignInWithGoogle } from '@/utils/redux/store/actions/auth-action/auth-action';
import { AppDispatch } from '@/utils/redux/store/store';
import { SendSignInFormHandlerType, SendSignInWithGoogleType } from '@/utils/types/components-props';
import { Button, Checkbox, Divider, Group, PasswordInput, Stack, Text, TextInput, Typography } from '@mantine/core'
import { useForm } from "@mantine/form";
import { IconBrandFacebook, IconBrandFacebookFilled, IconBrandGithub, IconBrandGoogle, IconBrandGoogleFilled } from '@tabler/icons-react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
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
            password: (value) => (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&<>*+]).{4,}$/.test(value) ? null : 'Please enter the more stronger password be like 8 characters, numbers,special character...'),
        },
    });

    // navigation router defined here....
    const router = useRouter();

    // dispatch functions defined here...
    const dispatch = useDispatch<AppDispatch>();

    // Sign In Handler
    const signInFromHanlder = (values: SendSignInFormHandlerType): void => {
        var isTrue: Boolean = true;
        dispatch(dispatchSignInState(values))
            .catch((err) => { toast(`🤡 ${err}`); isTrue = false })
            .finally(() => {
                if (isTrue) {
                    toast("🥳 Form is submitted");
                    form.reset();
                    router.push("/");
                }
                isTrue = true;
            });
    }
    // hanlde signin with google instance...
    const handleGoogleSignIn = async () => {
        var isTrue: Boolean = true;

        try {

            const provider = new GoogleAuthProvider();
            const resGoogle = await signInWithPopup(auth, provider);

            const saveUser: SendSignInWithGoogleType = {
                name: resGoogle.user.displayName,
                photoUrl: resGoogle.user.photoURL,
                phone: resGoogle.user.phoneNumber,
                verifiedEmail: resGoogle.user.emailVerified,
                email: resGoogle.user.email,
                uid: resGoogle.user.uid,
                password: "",
                token: await resGoogle.user.getIdToken()
            }
            dispatch(dispatchSignInWithGoogle(saveUser))
                .catch((err) => { toast(`🤡 ${err}`); isTrue = false })
                .finally(() => {
                    if (isTrue) {
                        toast("🥳 Form is submitted");
                        form.reset();
                        router.push("/");
                    }
                    isTrue = true;
                });

        } catch (err) {
            toast("Some thing went worng while google signIn");
        }

    }
    return (
        <div className='min-h-full h-full w-full flex items-center justify-center flex-col gap-4'>
            <Toaster />
            <Stack className='min-h-[350px] bg-white w-[40vw] min-w-[300px] border border-slate-200 p-4 shadow rounded-sm'>
                <Text size='xl' color='blue' fw={700}>
                    Sign In
                </Text>
                <form className='my-3' onSubmit={form.onSubmit((values) => signInFromHanlder(values))}>
                    <TextInput
                        withAsterisk
                        label="Email"
                        placeholder="your@email.com"
                        required
                        id="email"
                        key={form.key('email')}
                        {...form.getInputProps('email')}
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="type your own password"
                        required
                        id="password"
                        key={form.key('password')}
                        {...form.getInputProps('password')}
                    />
                    <Checkbox
                        mt="md"
                        label="I accept your policy!"
                        id="termsOfService"
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
                <Divider label={"OR"} />
                <Button onClick={handleGoogleSignIn} leftSection={<IconBrandGoogle />}>
                    Continue with Google
                </Button>
            </Stack>
        </div>
    )
}

export default LogInScreen;