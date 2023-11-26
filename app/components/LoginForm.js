import React from 'react'
import { View, StyleSheet } from 'react-native'
import FormContainer from './FormContainer';
import FormInput from './FormInput';
import FormSubmitButton from './FormSubmitButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import client from '../api/client';
import { StackActions } from '@react-navigation/native';
import { useLogin } from '../context/LoginProvider';
import { login } from '../api/user';


const validationSchema = Yup.object({
    email: Yup.string().trim().email('Invalid email!').required('Email is required!'),
    password: Yup.string().trim().required('Password is required!'),
});

const LoginForm = ({ navigation }) => {
    const { setIsLogged, setUserProfile, setLoginPending } = useLogin();
    const userInfo = {
        email: 'omer@gmail.com',
        password: 'omer1234'
    };

    const loginForm = async (values, formikActions) => {
        setLoginPending(true);
        try {
            const res = await login(values.email, values.password);

            if (res.data.success) {
                setUserProfile(res.data.user);
                setIsLogged(true);
                formikActions.resetForm();
            }
            formikActions.setSubmitting(false);
        } catch (err) {
            console.log(err);
        }
        setLoginPending(false);
    };

    return (
        <View>
            <Formik
                initialValues={userInfo}
                validationSchema={validationSchema}
                onSubmit={loginForm}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => {
                    const { email, password } = values;
                    return (
                        <FormContainer>
                            <FormInput
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                error={touched.email && errors.email}
                                value={values.email}
                                label={'Email'}
                                placeholder={'example@email.com'} />


                            <FormInput
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                error={touched.password && errors.password}
                                value={values.password}
                                secureTextEntry
                                label={'Password'}
                                placeholder={'********'} />
                            <FormSubmitButton
                                onPress={handleSubmit}
                                submiting={isSubmitting}
                                title={'Login'} />
                        </FormContainer>
                    )
                }}
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({

});

export default LoginForm;