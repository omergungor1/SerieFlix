import AsyncStorage from '@react-native-async-storage/async-storage';
import client from './client';

export const login = async (email, password) => {
    try {
        const loginRes = await client.post('/login', {
            email,
            password
        })

        if (loginRes.data.success) {
            const token = loginRes.data.token;
            await AsyncStorage.setItem('token', token);
        }
        return loginRes;
    } catch (err) {
        console.log('Error inside login methon! ', err.message);
        return false;
    }
}

export const signOut = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
            const res = await client.get('/logout', {
                headers: {
                    Authorization: `JWT ${token}`,
                }
            });
            if (res.data.success) {
                await AsyncStorage.removeItem('token');
                return true;
            }

        }
    } catch (err) {
        console.log('Error inside signOut method! ', err.message);
    }
    return false;
}