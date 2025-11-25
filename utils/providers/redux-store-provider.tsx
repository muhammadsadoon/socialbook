"use client";

import { Provider } from "react-redux";
import { ReduxProviderProps } from "../types/components-props";
import store from "../redux/store/store";

const ReduxStoreProvider = ({ children }: ReduxProviderProps) => {
    return (
        <div>
            <Provider store={store}>
                {children}
            </Provider>
        </div>
    )
}

export default ReduxStoreProvider
