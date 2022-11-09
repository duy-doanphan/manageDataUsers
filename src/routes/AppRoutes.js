import {Route, Routes} from "react-router-dom";
import Home from "../component/Home/Home";
import TableUser from "../component/TableUser";
import Login from "../component/Auth/Login";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
    return(
        <>
            <Routes>
                <Route path='/' element={<Home></Home>}></Route>
                <Route path="/login" element={<Login></Login>}></Route>
                <Route
                    path={'/users'}
                    element={
                        <PrivateRoute>
                            <TableUser></TableUser>
                        </PrivateRoute>
                    }
                ></Route>
            </Routes>
        </>
    )
}
export default AppRoutes;