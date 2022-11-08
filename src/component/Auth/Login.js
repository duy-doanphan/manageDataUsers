import './Login.scss'
import {useState} from "react";
import {loginApi} from "../../sevices/UserService";
import {toast} from "react-toastify";

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
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
            return
        }
        if (!password) {
            toast.error('Missing password!')
            return;
        }
        if (validateEmail(email)) {
            let res = await loginApi('eve.holt@reqres.in', 'cityslicka');
            console.log(res)
            if (res && res.token) {
                localStorage.setItem('token',res.token)
            }
        } else {
            toast.error('Email invalidate')
            return;
        }


        // if (+res.status === 400 ) {
        //     toast.error('Invalid Email/Password!')
        //     return
        // } else {
        //     console.log(res)
        // }
    }

    return (
        <>
            <div className='login-container col-12 col-sm-4'>
                <div className='title '>Login</div>
                <div className='text'>Email or user name</div>
                <input type='text' placeholder='Email or username...' value={email} onChange={(event) => {
                    setEmail(event.target.value)
                }}/>
                <div className='input-password'>
                    <input type={showPassword ? 'text' : 'password'} placeholder='Password' value={password}
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
                >Login
                </button>
                <div className='back-home'>{`<<< Go back home`}</div>
            </div>
        </>


    )
}
export default Login;
