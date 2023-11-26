import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import client from '../api/client';
import { StackActions } from '@react-navigation/native';
import UploadProgress from './UploadProgress';
import { useLogin } from '../context/LoginProvider';

const ImageUpload = (props) => {
    const { setIsLogged, setUserProfile } = useLogin();
    const [profileImage, setProfileImage] = useState('');
    const [upload, setUpload] = useState('Upload');
    const [progress, setprogress] = useState(0);
    const { token } = props.route.params;
    const openImageLibrary = async () => {

        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            return alert('Sorry, we need camera roll permissions to make this work!');
        }

        const response = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
        });

        if (!response.canceled) {
            setProfileImage(response.assets[0].uri);
        }
        else {
            setProfileImage('');
        }


    };

    const uploadProgfileImage = async () => {
        setUpload('Uploading...');
        setprogress(0);
        const formData = new FormData();
        formData.append('profile', {
            name: new Date() + '_profile',
            type: 'image/jpeg',
            uri: profileImage
        });

        try {
            const res = await client.post('/upload-profile-image', formData, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    "authorization": `JWT ${token}`
                },
                onDownloadProgress: ({ loaded, total }) => {
                    setprogress(Math.round((loaded * 100) / total));
                }
            });

            // console.log('###################### Response ######################');
            // console.log(res.data);
            // console.log('User: ', res.data.user);

            setUserProfile(res.data.user);
            setIsLogged(true);

            // if (res.data.success) {
            //     props.navigation.dispatch(
            //         StackActions.replace('UserProfile')
            //     );
            // }

        } catch (err) {
            console.log(err.message);
        }
        setUpload('Done');

    };

    const skipImageUpload = () => {
        setIsLogged(true);

        // props.navigation.dispatch(
        //     StackActions.replace('UserProfile', {
        //         // navigation,
        //         token,
        //     })
        // );

        // console.log('here');
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <View>
                    <TouchableOpacity onPress={openImageLibrary} style={[styles.uploadBtnContainer, profileImage ? styles.solid : styles.dashed]}>
                        {profileImage ?
                            <Image source={{ uri: profileImage }} style={styles.imageBox} /> :
                            <Text style={styles.uploadBtn}>Upload Profile Image</Text>}
                    </TouchableOpacity>
                    <Text onPress={skipImageUpload} style={styles.skip}>Skip</Text>
                    {profileImage ? <Text style={styles.upload} onPress={uploadProgfileImage}>{upload}</Text> : null}
                </View>
            </View>
            {progress ? <UploadProgress process={progress} /> : null}
        </View>
    )
}

export default ImageUpload

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dashed: {
        borderStyle: 'dashed',
    },
    solid: {
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'green'
    },
    imageBox: {
        height: '100%',
        width: '100%',
        borderRadius: 125 / 2
    },
    uploadBtnContainer: {
        height: 125,
        width: 125,
        borderRadius: 125 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        overflow: 'hidden',
    },
    uploadBtn: {
        fontSize: 16,
        textAlign: 'center',
        opacity: 0.5,
        fontWeight: 'bold'
    },
    skip: {
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
        textTransform: 'uppercase',
        letterSpacing: 2,
        marginTop: 20,
        opacity: 0.3
    },
    upload: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 10,
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: 2,
        opacity: 0.3
    }
})