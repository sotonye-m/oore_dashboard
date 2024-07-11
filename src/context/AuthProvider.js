import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")) || {});
    let logoutTimeoutId;

    const resetLogoutTimer = () => {
        if (logoutTimeoutId) {
            clearTimeout(logoutTimeoutId);
        }
        logoutTimeoutId = setTimeout(() => {
            localStorage.removeItem("auth");
            localStorage.removeItem('bearerToken');
            localStorage.removeItem('email');
            setAuth({});
        }, 30 * 60 * 1000); // 30 minutes in milliseconds
    };

    const handleActivity = () => {
        resetLogoutTimer();
    };

    useEffect(() => {
        resetLogoutTimer();
        
        const events = ['mousemove', 'mousedown', 'keypress', 'touchstart', 'click'];
        events.forEach(event => window.addEventListener(event, handleActivity));

        return () => {
            events.forEach(event => window.removeEventListener(event, handleActivity));
            clearTimeout(logoutTimeoutId);
        };
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
