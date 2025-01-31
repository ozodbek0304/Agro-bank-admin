// src/NotFound.jsx

import { ThemeProvider } from "@gravity-ui/uikit";
import { useAppSelector } from "@/store/store";

const NotFound = () => {
    const { theme } = useAppSelector(state => state.theme)

    return (
        <ThemeProvider theme={theme}>
            <div style={{ height: '100vh', width: '100%' }}>
                <div className="text-center" style={{ padding: '160px 0' }}>
                    <h1>404 - Sahifa topilmadi!</h1>
                    <p>Kechirasiz, qandaydir muammo yuzaga kelgan bo'lishi mumkin</p>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default NotFound;
