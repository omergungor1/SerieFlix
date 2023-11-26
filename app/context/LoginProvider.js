import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useState, useEffect } from 'react';
import client from '../api/client';

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false); // for login status
    const [userProfile, setUserProfile] = useState(null); // for user profile
    const [loginPending, setLoginPending] = useState(false); // for loading indicator

    const fetchUserProfile = async () => {
        setLoginPending(true);
        const token = await AsyncStorage.getItem('token');
        console.log(token);
        if (token && token !== null) {
            try {
                const res = await client.get('/user-profile', {
                    headers: {
                        Authorization: `JWT ${token}`
                    }
                });
                if (res.data.success) {
                    setUserProfile(res.data.user);
                    setIsLogged(true);
                } else {
                    setUserProfile({});
                    setIsLogged(false);
                }
            } catch (err) {
                console.log('Err in validation sec! ', err);
                setUserProfile({});
                setIsLogged(false);
            }
        } else {
            setUserProfile({});
            setIsLogged(false);
        }
        setLoginPending(false);
    }

    useEffect(() => {
        fetchUserProfile();
    }, []);

    return (
        <LoginContext.Provider value={{ isLogged, setIsLogged, userProfile, setUserProfile, loginPending, setLoginPending }}>
            {children}
        </LoginContext.Provider>
    );
}

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;