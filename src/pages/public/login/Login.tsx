import { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Link } from '@mui/material';
import { ApiMethods } from '../../../utils/fetchApi';
import { DataLocalStorage } from '../../../config/data-local-storage';
import { useAuthContext, validsRols } from '../../../context/auth-context';
import { LoginResponse } from '../../../types/interfaces/user';
import { endpoints } from '../../../config/api';

export const Login = () => {
    const { setSession } = useAuthContext();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await ApiMethods.post<LoginResponse>(
                endpoints.auth.login,
                formData,
                {},
                false
            );
            const sessionData = {
                token: response.token,
                user: response.user,
                tipo: 1 as validsRols
            };
            DataLocalStorage.setSessionInLocalStorage(sessionData);
            setSession(sessionData);
            window.location.assign('/images');
        } catch (err) {
            console.error('Login error:', err);
            setError('Invalid credentials');
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">Login</Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    {error && <Typography color="error">{error}</Typography>}
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Login
                    </Button>
                    <Link href="/register" variant="body2">Don't have an account? Sign Up</Link>
                </Box>
            </Box>
        </Container>
    );
};