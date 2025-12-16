export type ReduxProviderProps = {
    children: React.ReactNode;
}
export type ThemeProviderProps = {
    children: React.ReactNode;
}

export type SendSignUpFormHandlerType = {
    name: string;
    email: string;
    phone: string;
    password: string;
    termsOfService: boolean;
}
export type SendSignInWithGoogleType = {
    name: string | null,
    photoUrl: string | null,
    phone: string | null,
    verifiedEmail: boolean | null,
    email: string | null,
    uid: string | null,
    password: string | null,
    token?: string | null
}
export type SendSignInFormHandlerType = {
    email: string;
    password: string;
    termsOfService: boolean;
}

export type DrawerComponentType = {
    children: React.ReactNode;
    isOpen: boolean;
    close: () => void;
}

export type InfiniteScrollComponent = {
    children: React.ReactNode;
    functionality?: Function;
}
export type DashBoardLayoutType = {
    children: React.ReactNode;
    leftSection?: React.ReactNode;
    rightSection?: React.ReactNode;
}