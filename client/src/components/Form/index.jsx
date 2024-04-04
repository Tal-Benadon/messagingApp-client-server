import React, { useEffect, useState } from 'react'
import InputWrapper from '../InputWrapper'
import styles from './styles.module.css'
import { Link } from 'react-router-dom'
import formConfig from '../../Helpers/formConfig.jsx'
import MessageButton from '../MessageButton';
export default function Form({ formType }) {
    const config = formConfig[formType]
    const [formTitle, setFormTitle] = useState('')

    useEffect(() => {
        if (formDetails) {
            const formDetails = formTypeSwitchCase(formType)
            console.log(formDetails.title);
            setFormTitle(formDetails.title)
        }
    }, [formType])

    const [formState, setFormState] = useState(() =>
        Object.keys(config.fields).reduce((accumulator, field) => {
            accumulator[field] = config.fields[field].initialValue;
            console.log(accumulator);
            return accumulator
        }, {})
    )

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormState((prev) => ({ ...prev, [name]: value }))
    }





    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(formState);
    }

    const formTypeSwitchCase = (formType) => {

        switch (formType) {
            case 'login':
                return {
                    title: 'Login',
                    content: (<div className={styles.loginBottom} >
                        <MessageButton wrap={config.submit.wrap}
                            icon={config.submit.icon()}
                            type={config.submit.type}
                            title={config.submit.label} />
                        <Link to={'/forgot-password'}>Forgot Password?</Link>
                    </div>),
                    extraContent: <p className={styles.registerTxt}>
                        Don't have an account? <Link to={'/register'}>
                            Register</Link></p>
                }
            case 'register':
                return {
                    title: 'Your first Mailbox is here',
                    content: (<div><MessageButton
                        icon={config.submit.icon()}
                        title={config.submit.label}
                        type={config.submit.type}
                    />
                        Already have an account? <Link to={'/login'}>Log in</Link>
                        <br />
                        By registering, you agree to out <Link to={'/terms'}>Terms of Use</Link>
                    </div>),
                }
            case 'forgotPassword':
                return {
                    title: 'Recover Password',
                    content: (<div className={styles.loginBottom}> <MessageButton
                        title={config.submit.label}
                        type={config.submit.type}
                        wrap={config.submit.wrap}
                    />
                        <Link to={'/login'}>Back to Login</Link>
                    </div>),
                    top: <p>Enter your email address and we'll send you a link to reset your password</p>
                }
            default:
                break;
        }
    }
    const formDetails = formTypeSwitchCase(formType)

    return (

        <form onSubmit={handleSubmit} className={styles.formStyle}>
            <h1 className={styles.title}>{formTitle}</h1>
            {formDetails.top && formDetails.top}
            {Object.entries(config.fields).map(([name, { label, type }]) => (
                <div key={name} >
                    <InputWrapper
                        title={label}
                        name={name}
                        type={type}
                        value={formState[name]}
                        onChange={handleChange} />
                </div>
            ))}
            {formDetails && formDetails.content}
            {formDetails && formDetails.extraContent}
        </form>

    )
}

