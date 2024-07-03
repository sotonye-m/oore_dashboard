import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")) || {});

    useEffect(() => {
        // Set a timeout to clear the local storage and reset the auth state
        const timeoutId = setTimeout(() => {
            localStorage.removeItem("auth");
            localStorage.removeItem('bearerToken');
            localStorage.removeItem('email');
            setAuth({});
        }, 1 * 60 * 60 * 1000); // 1 hour in milliseconds

        // When the component unmounts, clear the timeout
        return () => clearTimeout(timeoutId);
    }, [auth]);

    useEffect(() => {
        localStorage.setItem("auth", JSON.stringify(auth));
    }, [auth]);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
