import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import {useState} from "react";


const ModalAddNewUser = (props) => {
    const {show, handleClose} = props;
    const [name,setName] = useState('')
    const [job,setJob] = useState('')
    const handleSubmit = () => {
        console.log('check state', name , job)
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop={"static"}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Use</Modal.Title>
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
                    <Button variant="primary" onClick={()=>{handleSubmit()}}>
                        Create User
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalAddNewUser;