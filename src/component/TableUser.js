import Table from 'react-bootstrap/Table';
import './TableUser.scss'
import {useEffect, useState} from "react";
import {fetchAllUser} from "../sevices/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNewUser from "./ModalAddNewUser";
import ModalEditUser from "./ModalEditUser";
import _, {debounce} from "lodash";
import ModalComfirm from "./ModalComfirm";
import {CSVLink, CSVDownload} from "react-csv";


const TableUser = (props) => {
    const [listUser, setListUser] = useState([])
    const [totalUser, setTotalUser] = useState(0)
    const [totalPage, setTotalPage] = useState(0)

    const [showModalAddNewUser, setShowModalAddNewUser] = useState(false);
    const [showModalEditUser, setShowModalEditUser] = useState(false);
    const [showModalDeleteUser, setShowModalDelete] = useState(false)

    const [dataUserEdit, setDataUserEdit] = useState({})
    const [dataUserDelete, setDataUserDelete] = useState({})

    const [sortBy, setSortBy] = useState('asc')
    const [sortFied, setSortFied] = useState('id')

    const [keyword, setKeyword] = useState('')
    const [dataExport, setDataExport] = useState([])

    const handleClose = () => {
        setShowModalAddNewUser(false)
        setShowModalEditUser(false)
        setShowModalDelete(false)
    }
    const handleAddNewUser = () => {
        setShowModalAddNewUser(true)
    }
    const handleEditUser = (user) => {
        setDataUserEdit(user);
        setShowModalEditUser(true)
    }
    const handleDeleteUser = (user) => {
        setShowModalDelete(true);
        setDataUserDelete(user)
    }

    const handleUpdateTable = (user) => {
        setListUser([user, ...listUser])
    }
    const handleEditUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUser)
        let index = listUser.findIndex(item => item.id === user.id)
        cloneListUsers[index].first_name = user.first_name
        setListUser(cloneListUsers)
    }
    const handleDeleteUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUser)
        cloneListUsers = cloneListUsers.filter(item => item.id !== user.id);
        setListUser(cloneListUsers)
    }
    const handleSort = (sortBy, sortFied) => {
        setSortBy(sortBy)
        setSortFied(sortFied)
        let cloneListUsers = _.cloneDeep(listUser)
        cloneListUsers = _.orderBy(cloneListUsers, [sortFied], [sortBy])
        setListUser(cloneListUsers)
    }
    const handleSearch = debounce((event) => {
        let term = event.target.value;
        if (term) {
            let cloneListUsers = _.cloneDeep(listUser)
            cloneListUsers = cloneListUsers.filter(item => item.email.includes(term))
            setListUser(cloneListUsers)
        } else {
            getAllUser(1)
        }
    }, 500)

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

    const getUsersExport = (event, done) => {
        let result = [];
        if (listUser && listUser.length > 0) {
            result.push(['Id', 'Email', 'First name', 'Last name']);
            listUser.map((item, index) => {
                let arr = []
                arr[0] = item.id;
                arr[1] = item.email;
                arr[2] = item.first_name;
                arr[3] = item.last_name;
                result.push(arr);
            })
            setDataExport(result)
            done()
        }
    }
    return (
        <>
            <div className='my-3 d-flex justify-content-between align-items-center'>
                <span> <b>List User: </b></span>
                <div className='group-btns'>
                    <label className='btn btn-warning' htmlFor='test'>
                        <i className="fa-solid fa-file-import"></i> Import
                    </label>
                    <input id='test' type='file' hidden/>

                    <CSVLink
                        separator=";"
                        data={listUser}
                        asyncOnClick={true}
                        onClick={getUsersExport}
                        filename={"User.csv"}
                        className="btn btn-primary"
                    > <i className="fa-solid fa-download"></i> Export</CSVLink>

                    <button
                        className='btn btn-success'
                        onClick={() => {
                            handleAddNewUser()
                        }}
                    ><i className="fa-solid fa-plus"></i>
                        Add New
                    </button>
                </div>
            </div>
            <div className='col-6 my-3'>
                <input
                    className='form-control'
                    placeholder=' Search user by email'
                    // value={keyword}
                    onChange={(event) => {
                        handleSearch(event)
                    }}
                />
            </div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>
                        <div className='sort-header'>
                            <span>ID</span>
                            <span>
                            <i
                                className="fa-solid fa-arrow-down"
                                onClick={() => {
                                    handleSort('desc', 'id')
                                }}
                            ></i>
                            <i
                                className="fa-solid fa-arrow-up"
                                onClick={() => {
                                    handleSort('asc', 'id')
                                }}
                            ></i>
                        </span>
                        </div>
                    </th>
                    <th>Email</th>
                    <th>
                        <div className='sort-header'>
                            <span>First name</span>
                            <span>
                            <i
                                className="fa-solid fa-arrow-down"
                                onClick={() => {
                                    handleSort('desc', 'first_name')
                                }}
                            ></i>
                            <i
                                className="fa-solid fa-arrow-up"
                                onClick={() => {
                                    handleSort('asc', 'first_name')
                                }}
                            ></i>
                        </span>
                        </div>
                    </th>
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
                                        onClick={() => {
                                            handleEditUser(item)
                                        }}
                                    >Edit
                                    </button>
                                    <button
                                        className='btn btn-danger'
                                        onClick={() => {
                                            handleDeleteUser(item)
                                        }}
                                    >Delete
                                    </button>
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
                handleEditUserFromModal={handleEditUserFromModal}
            >
            </ModalEditUser>
            <ModalComfirm
                show={showModalDeleteUser}
                handleClose={handleClose}
                dataUserDelete={dataUserDelete}
                handleDeleteUserFromModal={handleDeleteUserFromModal}
            ></ModalComfirm>
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