import  {ErrorMessage, Form, Formik}  from 'formik'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Button, Header, Label } from 'semantic-ui-react'
import { useStore } from '../../stores/store'
import MyTextInput from '../utils/MyTextInput'

const LoginForm = () => {
    let { accountStore } = useStore();
    return (
        <Formik 
        initialValues ={{
            email: '',
            password: '',
            error: null
        }}
        onSubmit = {(values, {setErrors}) => accountStore.login(values).catch(error => 
            setErrors({error: 'Invalid email or password!'}))}>
            {({ handleSubmit, isSubmitting, errors}) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Login to reactivities' color='teal' textAlign='center'/>
                    <MyTextInput name='email' placeholder='Email'/>
                    <MyTextInput name='password' placeholder='Password' type='password'/>
                    <ErrorMessage name='error' render={() => <Label style={{marginBottom: 12}} basic color ='red' content={errors.error}></Label>}></ErrorMessage>
                    <Button loading={isSubmitting} positive type='submit' fluid>Login</Button>
                </Form>
            )}
        </Formik>
    )
}

export default observer(LoginForm)
