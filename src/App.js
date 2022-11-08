import './App.scss';
import Header from "./component/Header/Header";
import TableUser from "./component/TableUser";
import Container from "react-bootstrap/Container";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from "./component/Home/Home";
import {Route,Routes} from "react-router-dom";
import Login from '../src/component/Auth/Login'

function App() {
    return (
        <>
            <div className='app-container'>
                <Header></Header>
                <Container>
                    <Routes>
                        <Route path='/' element={<Home></Home>}></Route>
                        <Route path='/users' element={<TableUser></TableUser>}></Route>
                        <Route path="/login" element={<Login></Login>}></Route>
                    </Routes>
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
