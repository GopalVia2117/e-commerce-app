import { useState, useEffect } from "react"
import { useSelector } from "react-redux";
export const useToken = () => {
    const user = useSelector(state => state.user);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const currentToken = user && user.currentUser && user.currentUser.accessToken;
        setToken(currentToken);
    }, [user.currentUser]);

    return token;
}