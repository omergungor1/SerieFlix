import React, { useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import client from '../api/client';


export const UserProfile = (props) => {
    const token = (props.route.params.token) ? props.route.params.token : (props.token) ? props.token : '';

    useEffect(() => {
        const getUserProfile = async () => {

            try {
                // const res = await client.get('/user-profile', {
                //     headers: {
                //         authorization: token
                //     }
                // });
                // console.log(res.data);
            } catch (err) {
                console.log(err.message);
            }
        };

        getUserProfile();
    }), [];

    return (
        <View style={styles.container} >
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Profile</Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Token: JWT {token} </Text>
        </View>
    )

}

export default UserProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
