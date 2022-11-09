import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {NavLink, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../Context/UserContext";

const Header = (props) => {
    const {logout, user} = useContext(UserContext)
    const navigate = useNavigate();

    const [hiHeader, setHiHeader] = useState(false)

    // useEffect(() => {
    //     if (window.location.pathname === '/login') {
    //         setHiHeader(true)
    //     }
    // }, [])

    const handleLogin = () => {
        navigate('/login')
    }
    const handleLogout = () => {
        logout();
        navigate('/')
        toast.success('Logout Suceed!')
    }
    return (
        <>
            <Navbar bg='light' expand="lg">
                <Container>
                    <NavLink to={'/'} className='nav-link fs-5 mx-3'>Phan Duy</NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        {(user && user.auth || window.location.pathname === '/') &&
                            <>
                                <Nav className="me-auto" activeKey='/'>
                                    <NavLink to={'/'} className='nav-link'>Home</NavLink>
                                    <NavLink to={'/users'} className='nav-link'>Manage Users</NavLink>
                                </Nav>
                                <Nav>
                                    {user && user.email && <span className='nav-link'> Welcome {user.email}  </span>}
                                    <NavDropdown title="Setting" id="basic-nav-dropdown">
                                        {user && user.auth === true
                                            ? <NavDropdown.Item onClick={() => {
                                                handleLogout()
                                            }}>Log Out</NavDropdown.Item>
                                            : <NavDropdown.Item onClick={() => {
                                                handleLogin()
                                            }}>Login</NavDropdown.Item>}
                                    </NavDropdown>
                                </Nav>
                            </>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default Header;