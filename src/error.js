import { AuthErrorCodes } from "firebase/auth"

export const handleAuthError = (error) => {
    let message
    switch (error.code) {
        case AuthErrorCodes.INVALID_EMAIL:
            message = "Invalid email"
            break
        case AuthErrorCodes.INVALID_PASSWORD:
            message = "Invalid password"
            break
        default:
            message = "Invalid credentials"
            break
    }
    return message
}