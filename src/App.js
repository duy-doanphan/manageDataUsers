import './App.scss';
import Header from "./component/Header/Header";
import Container from "react-bootstrap/Container";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useContext, useEffect} from "react";
import {UserContext} from "./Context/UserContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
    const {loginContext} = useContext(UserContext);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            loginContext(localStorage.getItem('email'), localStorage.getItem('token'))
        }
    }, [])
    return (
        <>
            <div className='app-container'>
                <Header></Header>
                <Container>
                    <AppRoutes></AppRoutes>
                </Container>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>

    );
}

export default App;
