import './Login.scss'
import {useContext, useEffect, useState} from "react";
import {loginApi} from "../../sevices/UserService";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../../Context/UserContext";

const Login = (props) => {
    const {loginContext} = useContext(UserContext)
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loginAPI, setLoginAPI] = useState(false)
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }


    const validateEmail = (email) => {
        return String(email.trim())
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleLogin = async () => {
        if (!email) {
            toast.error('Missing email!')
        }
        if (!password) {
            toast.error('Missing password!')
        }
        if (validateEmail(email)) {
            setLoginAPI(true);
            let res = await loginApi(email.trim(), password);
            if (res && res.token) {
                loginContext(email, res.token)
                navigate('/')
                toast.success('Login suceed!')
            } else {
                //error
                if (res && res.status === 400) {
                    toast.error(res.data.error)
                }
            }
            setLoginAPI(false)
        } else {
            toast.error('Email invalidate')
        }
    }
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
           handleLogin()
        }
    }

    return (
        <>
            <div className='login-container col-12 col-sm-4'>
                <div className='title '>Login</div>
                <div className='text'>Email (eve.holt@reqres.in)</div>
                <input type='text' value={email} onChange={(event) => {
                    setEmail(event.target.value)
                }}/>
                <div className='input-password'>
                    <div className='text'>Password</div>
                    <input type={showPassword ? 'text' : 'password'} value={password}
                           onChange={(event) => {
                               setPassword(event.target.value)
                           }}
                           onKeyDown={(event) => {
                               handleKeyPress(event)
                           }}/>
                    <i onClick={() => {
                        handleShowPassword()
                    }} className={showPassword ? 'fa-solid fa-eye ' : ' fa-solid fa-eye-slash'}></i>
                </div>
                <button
                    className={email && password ? 'active' : ''}
                    disabled={email && password ? false : true}
                    onClick={() => {
                        handleLogin()
                    }}

                > {loginAPI && <i className="fa-solid fa-circle-notch fa-spin"></i>}
                    &nbsp; Login
                </button>
                <div onClick={() => {
                    navigate('/')
                }} className='back-home'>{`<<< Go back home`}</div>
            </div>
        </>


    )
}
export default Login;
