import {useEffect, useState} from "react";
import ModalAddNewUser from "./ModalAddNewUser";


const AddNewUser = (props) => {
    const [showModalAddNewUser, setShowModalAddNewUser] = useState(false);
    const handleClose = () => setShowModalAddNewUser(false);
    const handleShow = () => setShowModalAddNewUser(true);
    const handleAddNewUser = () => {
        setShowModalAddNewUser(true);
    }
    return (
        <div className='my-3 d-flex justify-content-between align-items-center'>
            <span> <b>List User: </b></span>
            <button
                className='btn btn-success'
                onClick={()=>{
                    handleAddNewUser()
                }}
            >Add New Users
            </button>
            <ModalAddNewUser
                show={showModalAddNewUser}
                handleClose={handleClose}
                handleShow={handleShow}
            ></ModalAddNewUser>
        </div>)
}

export default AddNewUser;