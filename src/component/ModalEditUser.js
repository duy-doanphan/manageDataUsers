import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {putUpdateUser} from '../sevices/UserService'
import {useEffect, useState} from "react";
import {toast} from "react-toastify";


const ModalEditUser = (props) => {
    const {show, handleClose, dataUserEdit, handleEditUserFromModal} = props;
    const [name, setName] = useState('')
    const [job, setJob] = useState('')
    const handleEditUser = async () => {
        let res = await putUpdateUser(name, job);
        if (!name) {
            toast.error('InValid Name!')
            return;
        }
        if (res && res.updatedAt) {
         //success
            handleEditUserFromModal({
                first_name:name,
                id : dataUserEdit.id,
                job: job
            })
            handleClose();
            toast.success('Update User Succeed!')
        }
    }
    useEffect(() => {
        if (show) {
            setName(dataUserEdit.first_name)
            setJob(dataUserEdit.job)
        }
    }, [dataUserEdit])
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
                                onChange={(event) => {
                                    setName(event.target.value)
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Jobs</label>
                            <input
                                type="text"
                                className="form-control"
                                value={job}
                                onChange={(event) => {
                                    setJob(event.target.value)
                                }}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                        handleEditUser()
                    }}>
                        Comfirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalEditUser;