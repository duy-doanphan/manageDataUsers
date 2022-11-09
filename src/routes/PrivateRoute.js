import {Route, Routes} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../Context/UserContext";
import {Alert} from "react-bootstrap";

const PrivateRoute = (props) => {
    const {user} = useContext(UserContext);
    if (user && !user.auth) {
        return (
            <>
                <Alert variant="danger"  className='mt-4'>
                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    <p>
                       You don't have permisson to acess this route!!!
                    </p>
                </Alert>
            </>
        )
    } else {
        return (
            <>
                {props.children}
            </>
        )
    }

}
export default PrivateRoute