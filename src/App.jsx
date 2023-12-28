import './App.css'
import LoginForm from './components/LoginForm'
import './assets/styles/login.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import ResetPassword from './components/ResetPassword';

function App() {

    return (
        <>
            <Router>
                <AuthProvider>
                    <Routes>
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                        <Route element={<ProtectedRoute />}>
                            <Route path="/" element={<Home />} />
                        </Route>
                    </Routes>
                </AuthProvider>
            </Router>
        </>
    )
}

export default App
