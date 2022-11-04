import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {createUser} from '../sevices/UserService'
import {useEffect, useState} from "react";
import {toast} from "react-toastify";


const ModalEditUser = (props) => {
    const {show, handleClose,dataUserEdit} = props;
    const [name,setName] = useState('')
    const [job,setJob] = useState('')
    const handleEditUser = () => {

    }
    useEffect(()=>{
        if (show) {
            setName(dataUserEdit.first_name)
        }
    },[dataUserEdit])
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop={"static"}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(event)=>{setName(event.target.value)}}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Jobs</label>
                            <input
                                type="text"
                                className="form-control"
                                value={job}
                                onChange={(event)=>{setJob(event.target.value)}}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={()=>{handleEditUser()}}>
                        Comfirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalEditUser;