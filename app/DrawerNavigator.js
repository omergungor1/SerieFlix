import React from "react";
import { Text, View, Image, Alert, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useLogin } from './context/LoginProvider';
import AppLoader from './components/AppLoader';
import { signOut } from './api/user';


import Home from './components/Home';
import Tasks from './components/Tasks';
import Player from './components/Player';



const Drawer = createDrawerNavigator();

const CustomDrawer = props => {
    const { setIsLogged, userProfile, setLoginPending } = useLogin();
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={{ flexDirection: 'row', backgroundColor: '#f6f6f6', alignItems: 'center', justifyContent: 'space-between', padding: 20 }}>
                    <View>
                        <Text>{userProfile.fullname}</Text>
                        <Text>{userProfile.email}</Text>
                    </View>
                    <Image
                        source={{ uri: userProfile.avatar || 'https://media.wired.com/photos/5934300fca941e4d0cb7a511/master/w_2560%2Cc_limit/tesla.jpg' }}
                        style={{ width: 60, height: 60, alignSelf: 'center', backgroundColor: 'red', borderRadius: 75 }}
                    />
                </View>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <TouchableOpacity
                onPress={async () => {
                    setLoginPending(true);
                    const isLoggedOut = await signOut();
                    console.log(isLoggedOut);
                    if (isLoggedOut) {
                        setIsLogged(false);
                    }

                    setLoginPending(false);
                }}
                style={{ position: 'absolute', bottom: 50, backgroundColor: '#f6f6f6', width: '100%', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                <Text>Log out</Text>
            </TouchableOpacity>
        </View>
    );
};

const DrawerNavigator = () => {
    const { loginPending } = useLogin();
    return (
        <>
            <Drawer.Navigator
                screenOptions={
                    {
                        headerShown: true,
                        headerTitle: '',
                        headerStyle: {
                            backgroundColor: '#fff',
                            elevation: 0,
                            shadowOpacity: 0,
                        },
                    }
                }
                drawerContent={(props) => <CustomDrawer {...props} />}
            >
                <Drawer.Screen name="Player" component={Player}
                    options={{
                        headerShown: true,
                        headerStyle: {
                            backgroundColor: '#000',
                            elevation: 0,
                            shadowOpacity: 0,
                        },
                    }}
                />
                <Drawer.Screen name="Home" component={Home} />
                <Drawer.Screen name="Tasks" component={Tasks} />
            </Drawer.Navigator>
            {loginPending ? <AppLoader /> : null}
        </>
    );
};

export default DrawerNavigator;