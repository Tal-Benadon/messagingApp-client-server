import { RiLoginCircleLine } from "react-icons/ri";
import { MdOutlineAssignment } from "react-icons/md";
import { IoPaperPlane } from "react-icons/io5";
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
            label: 'Sign In',
            type: 'submit',
            icon: () => <RiLoginCircleLine />,
            wrap: true
        },
    },
    register: {
        fields: {
            fullName: {
                label: 'Full Name',
                type: 'text',
                initialValue: '',
                validation: {
                    require: true,
                    message: 'Full name is a required field'
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
    createChat: {
        fields: {
            subject: {
                label: 'Subject',
                type: 'text',
                initialValue: '',
                validation: {
                    require: true,
                    message: 'Subject is required'
                },
            },
            to: {
                label: 'To',
                type: 'email',
                initialValue: '',
            },
        },
        submitTo: {
            label: 'Add',
            type: 'button',
            wrap: true
        },
        submit: {
            label: 'Send',
            icon: () => <IoPaperPlane />,
            type: 'submit',
            wrap: true
        }
    }
}
export default formConfig