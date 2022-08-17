import React, { useState } from 'react';
import { Container, Box, Avatar, Typography, TextField, Button, Grid } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../service/firebase';


const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginEmail = async () => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    const registerEmail = async () => {
        await createUserWithEmailAndPassword(auth, email, password);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isLogin) {
            try {
                await loginEmail();
            } catch (error: any) {
                alert(error.message);
            }
        } else {
            try {
                await registerEmail();
            } catch (error: any) {
                alert(error.message);
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {isLogin ? 'Login' : 'Sign Up'}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setEmail(e.target.value)
                        }
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setPassword(e.target.value)
                        }
                    />
                    <Button
                        disabled={!email || password.length < 6}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {isLogin ? 'Login' : 'Sign Up'}
                    </Button>
                    <Grid container>
                        <Grid item>
                            <span onClick={() => setIsLogin(!isLogin)}>
                                {isLogin ? 'Back to login' : 'Create new account'}
                            </span>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Auth;
