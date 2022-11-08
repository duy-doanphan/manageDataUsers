import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {NavLink,useNavigate} from "react-router-dom";




const Header = (props) => {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('./login')
    }
    const handleLogout = () => {
        navigate('./')
    }
    return (
        <>
            <Navbar bg='light' expand="lg">
                <Container>
                    <NavLink to={'/'} className='nav-link fs-5'>Phan Duy</NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto" activeKey='/'>
                            <NavLink to={'/'} className='nav-link'>Home</NavLink>
                            <NavLink to={'/users'} className='nav-link'>Manage Users</NavLink>
                        </Nav>
                        <Nav>
                            <NavDropdown title="Setting" id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={()=>{handleLogin()}}>Login</NavDropdown.Item>
                                <NavDropdown.Item onClick={()=>{handleLogout()}}>
                                    Log Out
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default Header;