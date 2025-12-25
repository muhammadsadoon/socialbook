export default interface initialStateAuthReducer {
    isAuthentication: null | {
        email: string,
        name?: string,
        password: string,
        error: boolean,
        errorMessage: string | undefined,
        token: string
    },
    profileUser: null | any
}
