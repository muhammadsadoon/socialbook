export type ReduxProviderProps = {
    children : React.ReactNode;
}
export type ThemeProviderProps = {
    children : React.ReactNode;
}

export type SendSignUpFormHandlerType = {
    name: string;
    email: string;
    phone: string;
    password: string;
    termsOfService: boolean;
}