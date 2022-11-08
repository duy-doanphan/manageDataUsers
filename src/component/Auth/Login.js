import './Login.scss'
import {useEffect, useState} from "react";
import {loginApi} from "../../sevices/UserService";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const Login = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loginAPI,setLoginAPI] = useState(false)
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    useEffect(()=>{
        let token = localStorage.getItem('token');
        if (token) {
            navigate('/')
        }
    },[])
    const validateEmail = (email) => {
        return String(email)
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
            let res = await loginApi(email,password);
            if (res && res.token) {
                navigate('/')
                localStorage.setItem('token',res.token)
                toast.success('Login suceed!')
            } else {
                //error
                if (res && res.status === 400){
                    toast.error(res.data.error)
                }
            }
            setLoginAPI(false)
        } else {
            toast.error('Email invalidate')
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
                           }}/>
                    <i onClick={() => {
                        handleShowPassword()
                    }} className={showPassword ? 'fa-solid fa-eye ' : ' fa-solid fa-eye-slash'}></i>
                </div>
                <button
                    className={email || password ? 'active' : ''}
                    disabled={email || password ? false : true}
                    onClick={() => {
                        handleLogin()
                    }}
                > {loginAPI && <i className="fa-solid fa-circle-notch fa-spin"></i> }
                    &nbsp; Login
                </button>
                <div className='back-home'>{`<<< Go back home`}</div>
            </div>
        </>


    )
}
export default Login;