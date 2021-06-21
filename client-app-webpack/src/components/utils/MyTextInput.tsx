import { Field, useField } from 'formik'
import React from 'react'
import { Form } from 'semantic-ui-react';

interface Props {
    placeholder: string;
    name: string;
    type?: string;
    label?: string;
}

const MyTextInput = (props : Props) => {
    const [field, meta] = useField(props.name);
    return (
        <Form.Field>
            <label>{props.label}</label>
            <input {...field} {...props}/>
            {meta.touched && meta.error &&
                <p>{meta.error}</p>
            }
        </Form.Field>
    )
}

export default MyTextInput
