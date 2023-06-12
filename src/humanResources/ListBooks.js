import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import NavBar from "./NavBar";
import api from './AxiosConfig'
import {userDetail} from "./LoginForm";

const ListBooks = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {state: books} = location;

    const handleDelete = async (event, isbn) => {
        event.preventDefault();
        try {
            await api.delete(`/book/delete/${isbn}`)
            await api
                .get('/book/all')
                .then(response => navigate('/books', {state: response.data}))
                .catch(error => console.log(error))
        } catch (error) {
            console.error(error)
        }
    };

    function getThDelete(book) {
        return <th><Button onClick={(event) => handleDelete(event, book.isbn)}>Delete</Button></th>;
    }
    const handleModify = async (event, isbn) => {
        event.preventDefault();
        try {
            await api.get(`/book/find/${isbn}`)
                .then(response => navigate('/newbook', {state: response.data}))
                .catch((error => console.log(error)))
        } catch (error) {
            console.log(error)
        }
    }
    function getThModify(book) {
        return <th><Button onClick={(event) => handleModify(event, book.isbn)}>Modify</Button></th>;
    }

    return    <>
        <NavBar></NavBar>
        <Table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Release Date</th>
                    <th>Autor</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {books.map(book => (
                    <tr key={book.isbn}>
                        <td>{book.title}</td>
                        <td>{book.releaseDate}</td>
                        <td>{book.autor}</td>
                        {userDetail.rol === "admin" || userDetail.rol === "shop_manager" ? getThModify(book) : null}
                        {userDetail.rol === "admin" || userDetail.rol === "shop_manager" ? getThDelete(book) : null}
                    </tr>
            ))}
            </tbody>
        </Table>
    </>
}

export default ListBooks;