import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Carlist from "./components/Carlist";
import { useState } from "react";
import Login from "./components/Login";

const queryClient = new QueryClient();

function App() {
 const [isAuth, setAuth] = useState(false);
 const setAuthInfo = (auth: {isAuth: boolean, jwtToken: string}) => {
    sessionStorage.setItem("jwt", auth.jwtToken);
    setAuth(auth.isAuth);
 }
 const content = isAuth ?
    <QueryClientProvider client={queryClient}>
        <Carlist></Carlist>
    </QueryClientProvider> : <Login setAuth={setAuthInfo}/>
 return (
    <Container maxWidth="xl">
        <CssBaseline />
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">
                    Car Shop
                </Typography>
            </Toolbar>
        </AppBar>
        
        {content}
    </Container>
 );
}

export default App
