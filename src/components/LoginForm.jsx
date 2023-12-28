// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { LoadingButton } from '@mui/lab'
import { Alert, Button, Card, Container, Snackbar, TextField } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { handleAuthError } from '../error'
import { useAuth } from '../contexts/hooks'
import { Link, useNavigate } from 'react-router-dom';

function LoginForm() {
    const { login, currentUser } = useAuth()
    const navigate = useNavigate();


    const [formStatus, setFormStatus] = useState({
        authStatus: "",
        isLoading: false,
        errorMessage: ""
    })
    const [email, setEmail] = useState({
        content: "",
        isIncorrect: true
    })
    const [password, setPassword] = useState({
        content: "",
        isIncorrect: true
    })

    const emailRegex = /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/


    useEffect(() => {
        if (currentUser) {
            if (formStatus.authStatus === "success") {
                setTimeout(() => {
                    navigate("/")
                }
                    , 500)
            } else {
                navigate("/")
            }
        }
    })

    const handleOnEmailChange = (event) => {
        setEmail({
            content: event.target.value,
            isIncorrect: !event.target.value.match(emailRegex),
        })
        setFormStatus({ ...formStatus, authStatus: "" })
    }

    const handleOnPasswordChange = (event) => {
        setPassword({
            content: event.target.value,
            isIncorrect: event.target.value.length < 6,
        })
        setFormStatus({ ...formStatus, authStatus: "" })
    }


    const handleOnSubmit = () => {
        setFormStatus({ isLoading: true })

        login(email.content, password.content)
            .then(() => {
                setFormStatus({ ...formStatus, authStatus: "success" })
            })
            .catch(error => {
                setFormStatus({ authStatus: "fail", isLoading: false, errorMessage: handleAuthError(error) })
            })
    }
    return (
        <>
            <Container maxWidth="sm" className="container">
                <Card variant="outlined">
                    <form>
                        <div className="welcome">
                            <img src="/src/assets/yema_logo.svg" alt="Yema image" />
                            <span>Welcome to yema administration dashboard</span>
                        </div>
                        <div className="form-group">
                            <TextField
                                id="email"
                                label="Email"
                                variant="outlined"
                                size="medium"
                                fullWidth
                                onChange={handleOnEmailChange}
                                error={email.isIncorrect}
                                helperText={email.isIncorrect && "Please enter a valid email address"} />
                        </div>
                        <div className="form-group">
                            <TextField
                                id="password"
                                label="Password"
                                variant="outlined"
                                size="medium"
                                type="password"
                                fullWidth
                                onChange={handleOnPasswordChange}
                                error={password.isIncorrect}
                                helperText={password.isIncorrect && "Password must be at least 6 characters long"} />
                        </div>
                        <div className="form-group">
                            {formStatus.authStatus === "success" ?
                                <Button variant="contained" color="success" className="login-btn" startIcon={<CheckCircleOutlineIcon />}>
                                    Success
                                </Button>
                                :
                                <LoadingButton
                                    disabled={email.isIncorrect || password.isIncorrect}
                                    loading={formStatus.isLoading}
                                    className="login-btn"
                                    loadingPosition="start"
                                    startIcon={<LoginIcon />}
                                    variant="contained" color="primary" size="large" onClick={handleOnSubmit}>
                                    Login
                                </LoadingButton>
                            }
                        </div>
                    </form>
                    <div className="forgot-password"> <Link to="/reset-password" className="forgot-password">Forgot your password ?</Link> </div>
                </Card>
            </Container>

            {formStatus.authStatus === "fail" && <Snackbar open autoHideDuration={3000} >

                <Alert severity="error" variant="filled" sx={{ width: '100%' }}>
                    {formStatus.errorMessage}
                </Alert>
            </Snackbar>}
        </>
    )
}

export default LoginForm