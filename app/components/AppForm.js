import React, { useRef } from 'react';
import { ScrollView, StyleSheet, View, Animated, Dimensions } from 'react-native';
import FormHeader from './FormHeader';
import FormSelectorButton from './FormSelectorButton';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
const { width } = Dimensions.get('window');
import AppLoader from './AppLoader';
import { useLogin } from '../context/LoginProvider';

export default function AppForm({ navigation }) {
    const animation = useRef(new Animated.Value(0)).current;
    const scrollView = useRef();
    const { loginPending } = useLogin();

    const rightHeaderOpacity = animation.interpolate({
        inputRange: [0, width],
        outputRange: [0, 1]
    });
    const leftHeaderTranslateX = animation.interpolate({
        inputRange: [0, width],
        outputRange: [40, 0]
    });
    const rightHeaderTranslateY = animation.interpolate({
        inputRange: [0, width],
        outputRange: [-20, 0]
    });
    const loginColorInterpolate = animation.interpolate({
        inputRange: [0, width],
        outputRange: ['rgba(27,27,51,1)', 'rgba(27,27,51,0.4)']
    });
    const SignupColorInterpolate = animation.interpolate({
        inputRange: [0, width],
        outputRange: ['rgba(27,27,51,0.4)', 'rgba(27,27,51,1)']
    });

    return (
        <>
            <View style={{ flex: 1, paddingTop: 60 }}>
                <View style={{ height: 80 }}>
                    <FormHeader
                        leftHeading='Welcome '
                        rightHeading='Back'
                        subHeading='Youtube Task Manager'
                        leftHeaderTranslateX={leftHeaderTranslateX}
                        rightHeaderTranslateY={rightHeaderTranslateY}
                        rightHeaderOpacity={rightHeaderOpacity}
                    />
                </View>
                <View style={{ flexDirection: 'row', padding: 20, marginBottom: 20 }}>
                    <FormSelectorButton
                        style={styles.borderLeft}
                        backgroundColor={loginColorInterpolate}
                        title='Login'
                        onPress={() => scrollView.current.scrollTo({ x: 0, animated: true })}
                    />
                    <FormSelectorButton
                        style={styles.borderRight}
                        backgroundColor={SignupColorInterpolate}
                        title='Sign up'
                        onPress={() => scrollView.current.scrollTo({ x: width, animated: true })}
                    />
                </View>
                <ScrollView
                    ref={scrollView}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={
                        Animated.event([{ nativeEvent: { contentOffset: { x: animation } } }], { useNativeDriver: false })
                    }
                    scrollEventThrottle={25}
                >
                    <LoginForm navigation={navigation} />
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        showsHorizontalScrollIndicator={false}
                    >
                        <SignupForm navigation={navigation} />
                    </ScrollView>
                </ScrollView>
            </View>
            {loginPending ? <AppLoader /> : null}
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    borderLeft: {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    borderRight: {
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
    }
});