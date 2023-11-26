import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FormContainer from './FormContainer';
import FormSubmitButton from './FormSubmitButton';
import FormInput from './FormInput';
import { Formik } from 'formik';
import * as Yup from 'yup';
import client from '../api/client';
import { StackActions } from '@react-navigation/native';
import { useLogin } from '../context/LoginProvider';
import { login } from '../api/user';

const validationSchema = Yup.object({
    fullname: Yup.string().trim().required('Full name is required!'),
    email: Yup.string().trim().email('Invalid email!').required('Email is required!'),
    password: Yup.string().trim().min(6, 'At least 6 characters!').required('Password is required!'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Password does not match!').required('This field is required!')
});

const SignupForm = ({ navigation }) => {
    const { setLoginPending, setUserProfile, setIsLogged } = useLogin();

    const userInfo = {
        fullname: '',
        email: '',
        password: 'hello1234',
        confirmPassword: 'hello1234'
    };

    const submitForm = async (values, formikActions) => {
        setLoginPending(true);
        try {
            // console.log(values);
            const res = await client.post('/signup', {
                ...values
            });
            // console.log(res.data)

            if (res.data.success) {
                const signInRes = await login(values.email, values.password);

                setUserProfile(res.data.user);
                // setIsLogged(true);

                // console.log(signInRes.data)
                if (signInRes.data.success) {
                    navigation.dispatch(
                        StackActions.replace('ImageUpload', {
                            token: signInRes.data.token,
                        })
                    );
                }
            }


            // formikActions.resetForm(); 
            formikActions.setSubmitting(false);
        } catch (err) {
            console.log(err);
        }
        setLoginPending(false);
    };

    return (
        <FormContainer>
            <Formik
                initialValues={userInfo}
                validationSchema={validationSchema}
                onSubmit={submitForm}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => {
                    const { fullname, email, password, confirmPassword } = values;
                    return (
                        <View>
                            <FormInput
                                value={values.fullname}
                                onChangeText={handleChange('fullname')}
                                onBlur={handleBlur('fullname')}
                                error={touched.fullname && errors.fullname}
                                label={'Full Name'}
                                placeholder={'John Doe'}
                            />
                            <FormInput
                                value={values.email}
                                inputMode={'email'}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                error={touched.email && errors.email}
                                label={'Email'}
                                placeholder={'example@email.com'}
                            />
                            <FormInput
                                value={values.password}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                error={touched.password && errors.password}
                                secureTextEntry
                                label={'Password'}
                                placeholder={'********'}
                            />
                            <FormInput
                                value={values.confirmPassword}
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                error={touched.confirmPassword && errors.confirmPassword}
                                secureTextEntry
                                label={'Confirm Password'}
                                placeholder={'********'}
                            />
                            <FormSubmitButton
                                onPress={handleSubmit}
                                submiting={isSubmitting}
                                title={'Sign up'}
                            />
                        </View>
                    )
                }}
            </Formik>
        </FormContainer>
    );

}

const styles = StyleSheet.create({
});

export default SignupForm;