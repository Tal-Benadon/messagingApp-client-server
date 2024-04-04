import React from 'react'
import styles from './styles.module.css'
import Form from '../../components/Form'
export default function ForgotPassword() {
    return (
        <div className='regLogPageContainer'><Form formType={'forgotPassword'} /></div>
    )
}
