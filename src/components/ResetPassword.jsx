// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { LoadingButton } from '@mui/lab'
import { Alert, Button, Card, Container, Snackbar, TextField } from '@mui/material'
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { handleAuthError } from '../error'
import { useAuth } from '../contexts/hooks'
import { Link, useNavigate } from 'react-router-dom';

export default function ResetPassword() {
    const { resetPassword } = useAuth()
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

    const emailRegex = /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/


    useEffect(() => {

        if (formStatus.authStatus === "success") {
            setTimeout(() => {
                navigate("/login")
            }
                , 1500)
        }
    })

    const handleOnEmailChange = (event) => {
        setEmail({
            content: event.target.value,
            isIncorrect: !event.target.value.match(emailRegex),
        })
        setFormStatus({ ...formStatus, authStatus: "" })
    }

    const handleOnSubmit = () => {
        setFormStatus({ isLoading: true })

        resetPassword(email.content)
            .then((result) => {
                console.log(result)
                setFormStatus({ ...formStatus, isLoading: false, authStatus: "success" })
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
                            <span>Reset your password</span>
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
                            {formStatus.authStatus === "success" ?
                                <Button variant="contained" color="success" className="login-btn" startIcon={<CheckCircleOutlineIcon />}>
                                    Success
                                </Button>
                                :
                                <LoadingButton
                                    disabled={email.isIncorrect}
                                    loading={formStatus.isLoading}
                                    className="login-btn"
                                    loadingPosition="start"
                                    startIcon={<RestartAltIcon />}
                                    variant="contained" color="primary" size="large" onClick={handleOnSubmit}>
                                    Send mail
                                </LoadingButton>
                            }
                        </div>
                    </form>
                    <div className="forgot-password"> <Link to="/login" className="forgot-password">Login ?</Link> </div>
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