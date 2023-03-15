import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {postCreateUser} from '../sevices/UserService'
import {useState} from "react";
import {toast} from "react-toastify";


const ModalAddNewUser = (props) => {
    const {show, handleClose,handleUpdateTable} = props;
    const [name,setName] = useState('')
    const [job,setJob] = useState('')
    const handleSubmit = async () => {
        let res = await postCreateUser(name, job);
        if (!name) {
            toast.error('InValid Name!')
            return;
        }
        if (!job) {
            toast.error('InValid Job!')
            return;
        }
        if (res && res.id) {
            handleClose();
            setName('')
            setJob('')
            toast.success('Create User Succeed! !')
            handleUpdateTable({first_name:name, id:res.id , job: res.job})
        }
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