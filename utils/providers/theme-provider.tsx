import { createTheme, MantineProvider } from '@mantine/core';
import { ThemeProviderProps } from '../types/components-props';

const theme = createTheme({
    /** Put your mantine theme override here */
});

const MantineThemeProvider = ({children}: ThemeProviderProps) => {
    return (
        <MantineProvider theme={theme}>
            {children}
        </MantineProvider>
    );
}

export default MantineThemeProvider;