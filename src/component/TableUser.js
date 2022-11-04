import Table from 'react-bootstrap/Table';
import {useEffect, useState} from "react";
import {fetchAllUser} from "../sevices/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNewUser from "./ModalAddNewUser";
import ModalEditUser from "./ModalEditUser";


const TableUser = (props) => {
    const [listUser, setListUser] = useState([])
    const [totalUser, setTotalUser] = useState(0)
    const [totalPage, setTotalPage] = useState(0)

    const [showModalAddNewUser, setShowModalAddNewUser] = useState(false);
    const [showModalEditUser, setShowModalEditUser] = useState(false);

    const [dataUserEdit, setDataUserEdit] =useState({})

    const handleClose = () => {
        setShowModalAddNewUser(false)
        setShowModalEditUser(false)
    }
    const handleAddNewUser = () => {
        setShowModalAddNewUser(true)
    }
    const handleEditUser = (user) => {
        setDataUserEdit(user);
        setShowModalEditUser(true)
    }
    const handleUpdateTable = (user) => {
        setListUser([user, ...listUser])
    }

    useEffect(() => {
        // call apis
        getAllUser(1)
    }, [])

    const getAllUser = async (page) => {
        let res = await fetchAllUser(page)
        if (res && res.data && res.data) {
            setTotalUser(res.total)
            setTotalPage(res.total_pages)
            setListUser(res.data)
        }
    }
    const handlePageClick = (event) => {
        getAllUser(+event.selected + 1)
    }

    return (
        <>
            <div className='my-3 d-flex justify-content-between align-items-center'>
                <span> <b>List User: </b></span>
                <button
                    className='btn btn-success'
                    onClick={() => {
                        handleAddNewUser()
                    }}
                >Add New Users
                </button>
            </div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Action</th>

                </tr>
                </thead>
                <tbody>
                {listUser && listUser.length > 0 &&
                    listUser.map((item, index) => {
                        return (
                            <tr key={`users-${index}`}>
                                <td>{item.id}</td>
                                <td>{item.email}</td>
                                <td>{item.first_name}</td>
                                <td>{item.last_name}</td>
                                <td>
                                    <button
                                        className='btn btn-primary mx-3'
                                        onClick={()=>{handleEditUser(item)}}
                                    >Edit
                                    </button>
                                    <button className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>
            <ModalAddNewUser
                show={showModalAddNewUser}
                handleClose={handleClose}
                handleUpdateTable={handleUpdateTable}
            ></ModalAddNewUser>
            <ModalEditUser
                show={showModalEditUser}
                handleClose={handleClose}
                dataUserEdit={dataUserEdit}
            >

            </ModalEditUser>
            <ReactPaginate
                className='pagination d-flex justify-content-center'
                nextLabel="Next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPage}
                previousLabel="Previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
            />
        </>
    )
}
export default TableUser;