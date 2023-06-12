import NavBar from "./NavBar";
import React, {useEffect, useState} from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import api from './AxiosConfig'
import {useLocation, useNavigate} from 'react-router-dom';

function NewBook() {
    const [isbn, setIsbn] = useState('');
    const [title, setTitle] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [autor, setAutor] = useState('');
    const navigate = useNavigate();
    const {state} = useLocation()

    useEffect(() => {
        if (state) {
            setIsbn(state.isbn)
            setTitle(state.title)
            setReleaseDate(state.releaseDate)
            setAutor(state.autor)
        }
    }, [state])
    console.log(isbn + " " + title + " " + releaseDate + " " + autor)

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await api.post('/book/new',
                {
                    isbn,
                    title,
                    releaseDate,
                    autor
                })
            await api
                .get('/book/all')
                .then(response => navigate('/books', {state: response.data}))
                .catch(error => console.log(error))
        } catch (error) {
            console.error(error)
        }
    };


    const handleModify = async (event) => {
        event.preventDefault();
        try {
            await api.put('/book/edit',
                {
                    isbn,
                    title,
                    releaseDate,
                    autor
                })
            await api
                .get('/book/all')
                .then(response => navigate('/books', {state: response.data}))
                .catch(error => console.log(error))
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <>
            <NavBar></NavBar>
            <Form style={{paddingLeft: "24px"}} onSubmit={!state ? handleSubmit : handleModify}>
                <Form.Group className="mb-3" controlId="formISBN">
                    <Form.Label>ISBN</Form.Label>
                    <Form.Control required={true} type="text" placeholder="ISBN" disabled={state?.isbn}
                                  defaultValue={state?.isbn}
                                  onChange={(e) => setIsbn(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label>Title</Form.Label>
                    <Form.Control required={true} type="text" placeholder="Title"
                                  defaultValue={state?.title}
                                  onChange={(e) => {
                                      setTitle(e.target.value)
                                  }}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formLastName">
                    <Form.Label>Release Date</Form.Label>
                    <Form.Control required={true} type="date" placeholder="2000-10-10"
                                  defaultValue={state?.releaseDate}
                                  onChange={(e) => setReleaseDate(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formRole">
                    <Form.Label>Autor</Form.Label>
                    <Form.Control required={true} type="text" placeholder="Autor"
                                  defaultValue={state?.autor}
                                  onChange={e => setAutor(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    {!state ? "Create" : "Modify"}
                </Button>
            </Form>
        </>
    )
}

export default NewBook;