import React from 'react';
import './Login.css';
import { withFormik } from 'formik';
import * as Yup from 'yup';

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
                        <input onChange={handleChange} type="text" name="username" required="" />
                        <label>Username</label>
                        <p>{errors.username ? ( <p className='text-red-500'>{errors.username}</p> ) : null}</p>
                    </div>
                   
                    <div className="user-box">
                        <input onChange={handleChange} type="password" name="password" required="" />
                        <label>Password</label>
                        <p>{errors.password ? ( <p className='text-red-500'>{errors.password}</p> ) : null}</p>
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
        username: '',
        password: '',
    }),
    validationSchema: Yup.object({
        username: Yup.string().required("Tài khoản không được để trống").min(6, "tối thiểu 6 ký tự ").max(15, "Tối đà 15 ký tự"),
        password: Yup.string().required("Mật khẩu không được để trống").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{4,10}$/, "Mật khẩu từ 6-10 ký tự, phải có ký tự thường, in hoa, đặc biệt, số"),
    }),
    handleSubmit: (values, { setSubmitting }) => {
        console.log(values)
    },

    displayName: 'LoginWithFormik',
})(Login);

export default LoginWithFormik;
