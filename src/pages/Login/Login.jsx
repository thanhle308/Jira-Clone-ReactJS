import React from 'react';
import './Login.css';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { USER_SIGNIN_API } from '../../redux/types/Jirabugs/JirabugsType';
import { signinJirabugsAction } from '../../redux/actions/JiraBugsAction';


const Login = (props) => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;
    return (
        <div>

            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="user-box">
                        <input onChange={handleChange} type="text" name="email" required="" />
                        <label>Email</label>
                        <div>{errors.email ? ( <div className='text-red-500'>{errors.email}</div> ) : null} </div>
                    </div>
                   
                    <div className="user-box">
                        <input onChange={handleChange} type="password" name="password" required="" />
                        <label>Password</label>
                        <div>{errors.password ? ( <div className='text-red-500'>{errors.password}</div> ) : null} </div>
                    </div>
                    <button>
                        <a>
                            <span />
                            <span />
                            <span />
                            <span />
                            Submit
                        </a>
                    </button>

                </form>
            </div>
        </div>
    );
}


const LoginWithFormik = withFormik({
    mapPropsToValues: () => ({
        email: '',
        password: '',
    }),
    validationSchema: Yup.object({
        email: Yup.string().required("Tài khoản không được để trống"),
        password: Yup.string().required("Mật khẩu không được để trống"),
    }),
    handleSubmit: ({email,password}, { props, setSubmitting }) => {
        props.dispatch(signinJirabugsAction(email,password));

        // console.log(props)
        // console.log(values)
    },

    displayName: 'LoginWithFormik',
})(Login);

export default connect ()(LoginWithFormik);
