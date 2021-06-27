import  {ErrorMessage, Form, Formik}  from 'formik'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Button, Header, Label } from 'semantic-ui-react'
import { useStore } from '../../stores/store'
import MyTextInput from '../utils/MyTextInput'
import * as Yup from 'yup';
import ValidationError from '../utils/ValidationError'

const RegisterForm = () => {
    let { accountStore } = useStore();
    return (
        <Formik 
        initialValues ={{
            displayName: '',
            username: '',
            email: '',
            password: '',
            error: null
        }}
        onSubmit = {(values, {setErrors}) => accountStore.register(values).catch(error => 
            setErrors({error: error}))}
        validationSchema={Yup.object({
            displayName: Yup.string().required(),
            username: Yup.string().required(),
            email: Yup.string().required().email(),
            password: Yup.string().required(),
        })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Login to reactivities' color='teal' textAlign='center'/>
                    <MyTextInput name='displayName' placeholder='Display name'/>
                    <MyTextInput name='username' placeholder='Username'/>
                    <MyTextInput name='email' placeholder='Email'/>
                    <MyTextInput name='password' placeholder='Password' type='password'/>
                    <ErrorMessage name='error' render={() => 
                        <ValidationError errors={errors.error}/>}
                    />
                    <Button disabled={!isValid || !dirty  || isSubmitting} loading={isSubmitting} positive type='submit' fluid>Register</Button>
                </Form>
            )}
        </Formik>
    )
}

export default observer(RegisterForm)