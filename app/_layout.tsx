import { Stack } from "expo-router";
import { ThemeProvider } from "../hooks/ThemeProvider";

const RootLayout = () => {
    return (
        <ThemeProvider>
            <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
                
            </Stack>
        </ThemeProvider>
    );
};

export default RootLayout;
