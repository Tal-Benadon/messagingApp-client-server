import React from 'react'
import styles from './styles.module.css'
import Form from '../../components/Form'
export default function LoginPage() {
    return (
        <div className='regLogPageContainer'><Form formType={'login'} title={'Login'} /></div>
    )
}
