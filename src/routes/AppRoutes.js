import {Route, Routes} from "react-router-dom";
import Home from "../component/Home/Home";
import TableUser from "../component/TableUser";
import Login from "../component/Auth/Login";
import PrivateRoute from "./PrivateRoute";
import NotFound from "./NotFound";

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

                <Route path={'*'} element={<NotFound></NotFound>}></Route>
            </Routes>
        </>
    )
}
export default AppRoutes;