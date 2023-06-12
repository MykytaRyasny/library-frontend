import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {userDetail} from "./LoginForm";
import api from "./AxiosConfig";
import Image from "react-bootstrap/Image";
import logo from "../resources/logo_library.png";

function NavBar() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({})
    axios.defaults.baseURL = 'http://195.135.254.207:8080/library';

    useEffect(() => {
        if (userDetail) {
            setUserData(userDetail)
        }
    }, [])

    function onClickHome() {
        navigate('/main')
    }

    function onClickLogout() {
        axios
            .post('/auth/signout')
            .then(api.defaults.headers.common["x-auth-token"] = "")
            .then(response => navigate('/'))
            .catch(error => console.log(error))
    }

    function onClickList() {
        api
            .get('/book/all')
            .then(response => navigate('/books', {state: response.data}))
            .catch(error => console.log(error))

    }

    function onClickNewEmployee(){
        navigate('/newbook')
    }

    return (
        <Navbar bg="dark" variant="dark" sticky="top">
            <Container>
                <Image style={{maxWidth: "50px"}} src={logo} rounded/>
                <Navbar.Brand href="/main" onClick={() => onClickHome()}>Library</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link onClick={event => onClickList()
                    } href="/employees">Books</Nav.Link>
                    {(userData && userData.rol === "admin") || (userData && userData.rol === "shop_manager") ? (
                        <Nav.Link onClick={event => onClickNewEmployee()} href="/newbook">New Book</Nav.Link>
                    ) : null
                    }
                </Nav>
                <Nav>
                    <Nav.Link onClick={event => onClickLogout()} href="/">Logout</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;