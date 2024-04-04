import { RiLoginCircleLine } from "react-icons/ri";
import { MdOutlineAssignment } from "react-icons/md";
const formConfig = {
    login: {
        fields: {
            email: {
                label: 'Email',
                type: 'email',
                initialValue: '',
                validation: {
                    require: true,
                    message: 'Email is required'
                },
            },
            password: {
                label: 'Password',
                type: 'password',
                initialValue: '',
                validation: {
                    require: true,
                    message: 'Password is required'
                }
            }
        },
        submit: {
            label: 'Login',
            type: 'submit',
            icon: () => <RiLoginCircleLine />,
            wrap: true
        },
    },
    register: {
        fields: {
            firstName: {
                label: 'First Name',
                type: 'text',
                initialValue: '',
                validation: {
                    require: true,
                    message: 'First name is required'
                },
            },
            lastName: {
                label: 'Last Name',
                type: 'text',
                initialValue: '',
                validation: {
                    require: true,
                    message: 'Last name is required'
                },
            },
            email: {
                label: 'Email',
                type: 'email',
                initialValue: '',
                validation: {
                    require: true,
                    message: 'Email is required'
                },
            },
            password: {
                label: 'Password',
                type: 'password',
                initialValue: '',
                validation: {
                    require: true,
                    minLength: 8,
                    message: 'Password must be at east 8 characters'
                },
            },
            confirmPassword: {
                label: 'Confirm Password',
                type: 'password',
                initialValue: '',
                validation: {
                    require: true,
                    minLength: 8,
                    message: 'Password must be identical'
                },
            },
        },
        submit: {
            label: 'Register',
            type: 'submit',
            icon: () => <MdOutlineAssignment />,
            wrap: true
        },
    },
    forgotPassword: {
        fields: {
            email: {
                label: 'Email',
                type: 'email',
                initialValue: '',
                validation: {
                    require: true,
                    message: 'Email is required',
                },
            },
        },
        submit: {
            label: 'Send Reset Link',
            type: 'submit',
            wrap: true
        }
    },
}
export default formConfig