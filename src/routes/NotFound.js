import {Alert} from "react-bootstrap";

const NotFound = () => {
    return(
        <>
            <Alert variant="danger"  className='mt-4'>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    Not Found Page!!!
                </p>
            </Alert>
        </>
    )
}
export default NotFound