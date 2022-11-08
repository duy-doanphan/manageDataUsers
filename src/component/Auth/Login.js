import './Login.scss'
import {useState} from "react";

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
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
                    <input type={showPassword ? 'password' : 'text'} placeholder='Password' value={password}
                           onChange={(event) => {
                               setPassword(event.target.value)
                           }}/>
                    <i onClick={() => {
                        handleShowPassword()
                    }} className={showPassword ? 'fa-solid fa-eye-slash ' : 'fa-solid fa-eye'}></i>
                </div>
                <button
                    className={email && password ? 'active' : ''}
                    disabled={email && password ? false : true }
                >Login</button>
                <div className='back-home'>{`<<< Go back home`}</div>
            </div>
        </>


    )
}
export default Login;
