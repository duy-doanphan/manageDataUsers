import Table from 'react-bootstrap/Table';
import {useEffect, useState} from "react";
import {fetchAllUser} from "../sevices/UserService";


const TableUser = (props) => {
    const [listUser, setListUser] = useState([])

    useEffect(() => {
        // call apis
        getAllUser()
    }, [])

    const getAllUser = async () => {
        let res = await fetchAllUser()
        if (res && res.data && res.data) {
            setListUser(res.data)
        }
    }
    return (
        <>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>

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
                                    <button className='btn btn-primary mx-3'>Update</button>
                                    <button className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }

                </tbody>
            </Table>
        </>
    )
}
export default TableUser;