import { useState, useEffect } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ApiMethods } from '../../../utils/fetchApi';
import { Session, useAuthContext } from '../../../context/auth-context';
import { DataLocalStorage } from '../../../config/data-local-storage';
import { UpdateProfileResponse } from '../../../types/interfaces/user';
import { endpoints } from '../../../config/api';
import { logout } from '../../../utils/logout';

export const UserInformation = () => {
    const navigate = useNavigate();
    const { session, setSession } = useAuthContext();
    const [formData, setFormData] = useState({
        id: 0,
        name: '',
        lastName: '',
        email: '',
        username: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (session?.user) {
            setFormData({
                id: session.user.id,
                name: session.user.name,
                lastName: session.user.lastName,
                email: session.user.email,
                username: session.user.username
            });
        }
    }, [session]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await ApiMethods.put<UpdateProfileResponse>(
                endpoints.users.updateProfile,
                formData,
                {},
                true
            );

            if (session) {
                const updatedSession: Session = {
                    token: session.token,
                    user: {
                        id: formData.id,
                        name: formData.name,
                        lastName: formData.lastName,
                        email: formData.email,
                        username: formData.username
                    },
                    tipo: session.tipo
                };

                DataLocalStorage.setSessionInLocalStorage(updatedSession);
                setSession(updatedSession);
                window.location.assign('/images');
            }
        } catch (err) {
            console.error('Update error:', err);
            setError('Update failed');
        }
    };


    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">Profile Information</Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Last Name"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                    {error && <Typography color="error">{error}</Typography>}
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
                        Update Profile
                    </Button>
                    <Button
                        onClick={() => navigate('/change-password')}
                        fullWidth
                        variant="outlined"
                        sx={{ mt: 2 }}
                    >
                        Change Password
                    </Button>
                    <Button
                        onClick={() => logout('/login')}
                        fullWidth
                        variant="contained"
                        color="error"
                        sx={{ mt: 2 }}
                    >
                        Logout
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};