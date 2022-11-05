import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {deleteUser} from '../sevices/UserService'

const ModalComfirm = (props) => {
    const {show, handleClose,dataUserDelete} = props;

    const handleDelete = async () => {
        let res = await deleteUser(dataUserDelete.id);
        console.log(res)
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop={"static"}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <div>
                            This action can't be undone!
                            Do want to delete this user,
                            <br/>
                            <b>email = '{dataUserDelete.email}' ?</b>
                        </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={()=>{handleDelete()}}>
                        Comfirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalComfirm;