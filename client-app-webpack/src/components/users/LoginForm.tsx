import  {Form, Formik}  from 'formik'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Button } from 'semantic-ui-react'
import { useStore } from '../../stores/store'
import MyTextInput from '../utils/MyTextInput'

const LoginForm = () => {
    let { accountStore } = useStore();
    return (
        // <h1>dfsafasdfsd</h1>
        <Formik 
        initialValues ={{
            email: '',
            password: '',
            username: '',
            displayName: ''
        }}
        onSubmit = {values => accountStore.login(values)}>
            {({ handleSubmit}) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput name='email' placeholder='Email'/>
                    <MyTextInput name='password' placeholder='Password' type='password'/>
                    <Button posotive type='submit' fluid>Login</Button>
                </Form>
            )}
        </Formik>
    )
}

export default observer(LoginForm)
