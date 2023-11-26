import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AppForm from './components/AppForm';
import UserProfile from './components/UserProfile';
import ImageUpload from './components/ImageUpload';
import { useLogin } from './context/LoginProvider';
import DrawerNavigator from './DrawerNavigator';
import AppLoader from './components/AppLoader';


const Stack = createStackNavigator();


const StackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="AppForm"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="AppForm" component={AppForm} />
            <Stack.Screen name="ImageUpload" component={ImageUpload} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
        </Stack.Navigator>
    );
};

const MainNavigator = () => {
    const { isLogged, loginPending } = useLogin();
    return isLogged ?
        <>
            <DrawerNavigator />
            {loginPending ? <AppLoader /> : null}
        </>
        : <StackNavigator />;
};

export default MainNavigator;