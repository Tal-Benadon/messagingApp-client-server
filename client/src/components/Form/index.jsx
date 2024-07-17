import React, { useEffect, useRef, useState } from 'react'
import InputWrapper from '../InputWrapper'
import styles from './styles.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { FaFileImage } from "react-icons/fa6";
import formConfig from '../../Helpers/formConfig.jsx'
import MessageButton from '../MessageButton';
import MessageInputBox from '../MessageInputBox/index.jsx'
import google from '../../assets/google.svg'
import apiCall from '../../Helpers/api.jsx';
import apiToastCall from '../../Helpers/apiToast.jsx';
import { useUser } from '../../context/UserContext.jsx';
export default function Form({ formType }) {
    const config = formConfig[formType]
    const [formTitle, setFormTitle] = useState('')
    const [fileName, setFileName] = useState('Upload an Image')
    const { setUser } = useUser()
    const fileInputRef = useRef(null)
    const nav = useNavigate()
    const uploadClick = () => {
        fileInputRef.current.click()
    }

    useEffect(() => {
        if (formDetails) {
            const formDetails = formTypeSwitchCase(formType)
            console.log(formDetails.title);
            setFormTitle(formDetails.title)
        }
    }, [formType])

    const initialStateRef = useRef(Object.keys(config.fields).reduce((accumulator, field) => {
        accumulator[field] = config.fields[field].initialValue;

        return accumulator
    }, { file: null }))

    const [formState, setFormState] = useState(initialStateRef.current)

    const [errorForm, setErrorForm] = useState(() =>
        Object.keys(config.fields).reduce((accumulator, field) => {
            accumulator[field] = config.fields[field].initialValue;

            return accumulator
        }, {})
    )
    const validateLogin = (newData) => {
        const errors = {}
        const { email, password } = newData
        if ((password === '')) {
            errors.password = 'Required field'
        }
        if (email === '') {
            errors.email = 'Required field'
        } else if (!email.includes("@") || !email.includes(".")) {
            errors.email = 'Not a valid email'
        }
        return errors
    }

    const validateRegisterForm = (newData) => {
        const errors = {}
        const { password, confirmPassword, email, fullName } = newData

        const passRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;

        if ((!passRegex.test(password))) {
            errors.password = 'Password must be at least 8 characters and include a number'
        } else if ((password === '')) {
            errors.password = 'Required field'
        }

        if (confirmPassword !== password) {
            errors.confirmPassword = 'Passwords must be identical'
        } else if (confirmPassword == '') {
            errors.confirmPassowrd = 'Required field'


        } if (fullName === '') {
            errors.fullName = 'Required field'
        }
        if (email === '') {
            errors.email = 'Required field'
        } else if (!email.includes("@") || !email.includes(".")) {
            errors.email = 'Not a valid email'
        }
        return errors
    }

    const handleChange = (event) => {
        const { name, value, type, files } = event.target
        if (type === 'file') {
            if (files.length > 0) {
                setFormState(prev => ({ ...prev, [name]: files[0] }))
                setFileName(files[0].name)
            } else {
                setFormState(prev => ({ ...prev, [name]: null }));
                setFileName('Upload an Image');
            }

        } else {
            setFormState(prev => ({ ...prev, [name]: value }))
            setErrorForm(oldErrors => ({ ...oldErrors, [name]: '' }))
        }

    }

    const handleRemoveImg = () => {
        setFormState(prev => ({
            ...prev,
            file: null
        }))
        setFileName('Upload an Image')
    }

    const handleGoogleClick = () => {
        console.log("Google");
    }



    const handleSubmit = async (event) => {
        event.preventDefault()
        switch (formType) {
            case 'register':
                const errors = validateRegisterForm(formState)
                if (Object.keys(errors).length === 0) {
                    const formData = new FormData();
                    Object.entries(formState).forEach(([key, value]) => {
                        if (value instanceof File) {
                            formData.append(key, value, value.name)
                        } else {
                            formData.append(key, value)
                        }
                    });
                    const result = await apiCall({ method: "POST", url: `user/register`, body: formData })
                    const isSuccess = result.success
                    console.log({ result });
                    if (isSuccess === true) {
                        setFormState(initialStateRef.current)
                        setFileName('Upload an Image');
                        const formDataInfo = Object.fromEntries(formData)

                        const email = formDataInfo.email
                        const password = formDataInfo.password
                        const body = { email, password }
                        const { data } = await apiToastCall({ method: "POST", url: "user/login", body: body, pending: "Signing you in..", success: "Welcome!", error: "Login failed" })
                        const { token, user } = data
                        setUser(user)
                        localStorage.mailBoxToken = token
                        nav('/')
                    }
                } else {

                    setErrorForm(errors)
                }
                break;
            case 'login':
                const loginErrors = validateLogin(formState)
                if (Object.keys(loginErrors.length === 0)) {
                    const formData = new FormData(event.target)
                    const body = Object.fromEntries(formData)

                    const { data } = await apiToastCall({ method: "POST", url: "user/login", body: body, pending: "Signing in...", success: "Sign in successful", error: "Login failed" })
                    const { token, user } = data
                    console.log(token);
                    console.log(user);
                    setUser(user)
                    localStorage.mailBoxToken = token

                    nav('/')
                }
                break;
            default:
                break;
        }



    }

    const formTypeSwitchCase = (formType) => {

        switch (formType) {
            case 'login':
                return {
                    title: 'Welcome to Mailbox',
                    content: (<div className={styles.loginBottom} >
                        <div>
                            <Link className={styles.forgotLinkLog} to={'/forgot-password'}>Forgot Password?</Link>
                        </div>
                        <MessageButton
                            wrap={config.submit.wrap}
                            icon={config.submit.icon()}
                            type={config.submit.type}
                            title={config.submit.label} />
                        <div className={styles.registerTxt}>
                            <p >
                                Don't have an account?</p>{' '}<Link className={styles.link} to={'/register'}>
                                Register Here</Link>
                        </div>
                        <div className={styles.lineWithText}>
                            <div className={styles.line}></div>
                            <span className={styles.lineText}>OR</span>
                            <div className={styles.line}></div>
                        </div>
                        <div className={styles.googleWrap}>
                            <button type='button' className={styles.googleLogin} onClick={handleGoogleClick}>
                                <img src={google} alt="Google Icon" className={styles.googleIcon} />
                                Sign In with Google
                            </button>
                        </div>
                    </div>)
                }
            case 'register':
                return {
                    title: 'Sign up here',
                    top: 'Type your information below and we will take care of the rest',
                    content: (<div className={styles.registerContent}>
                        <div className={styles.fileUploadContainer}>
                            <p className={styles.uploadText}>Optional:</p>
                            <input type="file" name='file' accept='image/*' ref={fileInputRef} onChange={handleChange} style={{ display: 'none' }} />
                            <div className={styles.uploadBtn}>
                                <button title='Upload profile image' type='button' onClick={uploadClick} className={styles.icon}><FaFileImage /></button>
                                {fileName && <div className={styles.fileNameContainer}>
                                    <p className={styles.fileName}>{fileName}</p></div>}
                                {fileName && <button type='button' onClick={handleRemoveImg}>x</button>}
                            </div>
                        </div>
                        <div className={styles.btnDiv}>
                            <MessageButton
                                icon={config.submit.icon()}
                                title={config.submit.label}
                                type={config.submit.type}
                                wrap={config.submit.wrap}
                            />
                        </div>
                        <div className={styles.bottomLinks}>
                            <p className={styles.linkText}>Already have an account?</p><Link className={styles.link} to={'/login'}>Log in</Link>
                        </div>
                        <div className={styles.bottomLinks}>
                            <p className={styles.linkText}>By registering, you agree to out</p> <Link className={styles.link} to={'/terms'}>Terms of Use</Link>
                        </div>
                    </div>),
                }
            case 'forgotPassword':
                return {
                    title: 'Recover Password',
                    content: (<div className={styles.loginBottom}>
                        <div className={styles.backToLogin}>
                            <Link className={styles.link} to={'/login'}>Back to Login</Link>
                        </div>
                        <MessageButton
                            title={config.submit.label}
                            type={config.submit.type}
                            wrap={config.submit.wrap}
                        />
                    </div>),
                    top: <p>Enter your email address and we'll send you a link to reset your password</p>
                }
            case 'createChat':
                return {
                    content: (<MessageInputBox />

                    )
                }
            default:
                break;
        }
    }
    const formDetails = formTypeSwitchCase(formType)

    return (

        <form onSubmit={handleSubmit} className={styles.formStyle}>
            <h1 className={styles.title}>{formTitle}</h1>
            {formDetails?.top ? <p className={styles.topText}>{formDetails.top}</p> : ''}
            {Object.entries(config.fields).map(([name, { label, type }]) => (
                <div key={name} className={styles.inputContainer} >
                    <InputWrapper
                        title={formType === 'register' ? `${label}*` : label}
                        name={name}
                        type={type}
                        value={formState[name]}
                        onChange={handleChange} />
                    {errorForm[name] && <div className={styles.errorStyle}>{errorForm[name]}</div>}
                </div>
            ))}

            {formDetails && formDetails.content}
            {formDetails && formDetails.extraContent}
        </form>

    )
}

